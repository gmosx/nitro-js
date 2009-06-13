var Tag = require("./tag").Tag;

/**
 * The Taggable mixin adds tagging functionality to objects.
 */
var Taggable = exports.Taggable = function() {};

var CLEANUP_RX = /[\!|\.|\(|\)|\[|\]|\{|\}|\?|\&|\@]/g;

var tagStringCleanup = function(tagString) {
    return tagString.replace(CLEANUP_RX, "").replace(/, /g, ",").replace(/,$/, ""); // .squeeze(" ")
}

/**
 * Apply the given tagString to the object. Generate join table records.
 * No records are generated if the new tagString is the same with the existing 
 * tagString.
 */
Taggable.prototype.updateTags = function(tagString) {
    if (!tagString) return;

    var table = this.constructor.db.table;
  
    this.removeTags();
    this.tagString = tagStringCleanup(tagString);

    if (this.tagString != "") {
        var db = openDatabase();
        
        // TODO: add option to skip the UPDATE.
        db.execute("UPDATE " + table + " SET tagString=? WHERE id=?", this.tagString, this.id);

        var t, tname, tags = this.tagString.split(",");
    
        for (var i in tags) {
            tname = tags[i];
            db.execute("INSERT INTO Tag (name, count) VALUES (?, ?) ON DUPLICATE KEY UPDATE count=count+1", tname, 1);
            t = db.query("SELECT id FROM Tag WHERE name=?", tname).one(Tag);
            db.execute("INSERT INTO TagTo" + table + " (parentId, tagId) VALUES (?, ?)", this.id, t.id);
        }
    }
}

/**
 * Remove all tags.
 */
Taggable.prototype.removeTags = function() {
    if (!this.tagString) return;

    var tags = this.tagString.split(",");
    var table = this.constructor.db.table;
    
    var db = openDatabase();
    
    for (var i in tags) {
        db.execute("UPDATE Tag SET count=count-1 WHERE name=?", tags[i]);
        db.execute("DELETE FROM TagTo" + table + " WHERE parent_id=?", this.id);
    }
    
    // Delete obsolete tags. FIXME: potentially expensive, use index?
    db.execute("DELETE FROM Tag WHERE count=0");
}

/**
 */
Taggable.prototype.tagString_linked = function() {
    if (!this.tagString) return "";

    var t, tags = this.tagString.split(",");
    var arr = [];
    
    for (var i in tags) {
        t = tags[i];
        arr.push('<a href="/tags/*' + encodeURIComponent(t) + '">' + t + '</a>');
    }
    
    return arr.join(", ");
}

