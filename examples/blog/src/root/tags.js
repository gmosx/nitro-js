var NotFound = require("nitro/exceptions").NotFound;

var Tag = require("../content/tag").Tag;

exports.GET = function(env) {
    var db = openDatabase();
    
    var tags = db.query("SELECT name, count FROM Tag ORDER BY COUNT DESC LIMIT 100").all(Tag);

    if (tags) {
        var size, maxSize = 0;
        var maxCount = Number(tags[0].count);

        // The tags of the tagcloud are alphabetically sorted for convenience.
        // Cannot use multiple columns in ORDER BY to achieve the same effect.
        tags = tags.sort();

        var t, cloud = [];
        
        for (var i in tags) {
            t = tags[i];
            size = (Number(t.count) / maxCount) * 5;
            if (size > maxSize) maxSize = size;
            cloud.push('<a href="/tags/*' + t.name + '" style="font-size: ' + size + 'em">' + t.name + '</a>');
        }
        
        return {
            windowTitle: "Tags",
            tags: cloud.join(" "),
            maxSize: maxSize
        }
    } else
        throw NotFound("No tags found");
}
