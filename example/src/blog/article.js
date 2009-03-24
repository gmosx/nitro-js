var seo = require("blog/seo").SEO.encode;

/**
 * An article is the basic content unit.
 * Follows the Atom Publishing Format.
 */
var Article = exports.Article = function() {
}

Article.prototype.toString = function() {
    return this.title;
}

Article.prototype.path = function() {
    return "*" + this.id + "/" + seo(this.title);
}

