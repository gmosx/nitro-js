var file = require("file"),
    Template = require("template").Template;

exports.Layout = function(path) {
    var layout;

    return function(src) {
        var str;
        
        if (!layout) {
            var str = file.read(CONFIG.templateRoot + path).toString();
            layout = new Template(resolveIncludes(str));
        }
        
        var str = layout.render({yield: src});
        return resolveIncludes(str);
    }
}

var INCLUDE_RE = /\{\.include ["|'](.*?)["|']\}/g;

/**
 * Resolve include directives.
 * Example:
 *    {.include "/path/to/fragment"}
 */
var resolveIncludes = exports.resolveIncudes = function(str) {
    return str.replace(INCLUDE_RE, function(match) {
        var path = match.split(/["|']/)[1];
        return file.read(CONFIG.templateRoot + path).toString();        
    });
}
