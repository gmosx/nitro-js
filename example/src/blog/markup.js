var Markup = exports.Markup = {};

exports.markup = Markup.encode = function(src) {
    return src.replace(/\n/g, "<br />");
}

Markup.decode = function(src) {
}
