var SEO = exports.SEO = {};

SEO.encode = function(str) {
    return str.replace(/\.{2,}/g, ".");
}
