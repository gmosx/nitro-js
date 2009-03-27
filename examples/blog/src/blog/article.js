var Taggable = require("blog/taggable").Taggable,
    seo = require("blog/seo").SEO.encode;

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

