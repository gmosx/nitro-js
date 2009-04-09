require("lang/date");

var Taggable = require("app/content/taggable").Taggable,
    seo = require("app/content/seo").SEO.encode;

/**
 * An article is the basic content unit.
 * Follows the Atom Publishing Format.
 */
var Article = exports.Article = Object.type();

Article.include(Taggable);

Article.db = {
    table: "Article"
}

Article.prototype.toString = function() {
    return this.title;
}

Article.prototype.path = function() {
    return "*" + this.id + "/" + seo(this.title);
}

Article.prototype.deserialize = function() {
    this.created = Date.fromSQLString(this.created);
    this.updated = Date.fromSQLString(this.updated);
}
