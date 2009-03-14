
/**
 * An article is the basic content unit.
 *
 * title
 * content
 * author
 */
var Article = exports.Article = function() {
}

// Make the given string SEO friendly.
var seoEncode = function(str) {
    if (!str) return "";
    return str.replace(/\s/g, "-").replace(/[^\w-]/, ""); //.squeeze("-")[0..63]
}

Article.prototype.seoName = function() {
//    return seoEncode(this.title) + "-" + this.id;
    return this.id;
}

