var file = require("file"),
    Template = require("template").Template;

var LAYOUT_RE = /\{\.layout ["|'](.*?)["|']\}/;

/**
 * A (Rails-style) layout for templates. Implemented as a template filter to
 * be used with the Render middleware.
 */
exports.Layout = function() {
    var cache = {};

    return function(src) {
        var match = src.match(LAYOUT_RE);
        if (match) {        
            src = src.replace(LAYOUT_RE, "");
            
            var path = match[1];
            
            var layout = cache[path];
            if (!layout) {
                var str = file.read(CONFIG.templateRoot + path).toString();
                layout = cache[path] = new Template(resolveIncludes(str));
            }
            
            return resolveIncludes(layout.render(extractFragments(src)));
        } else {
            return src;
        }
    }
}

var FRAGMENT_RE = /\<l\:(.*?)\>([^\<]*?)\<\/l\:\1\>/;
var FRAGMENT_REG = /\<l\:(.*?)\>([^\<]*?)\<\/l\:\1\>/g;

/**
 *
 */
var extractFragments = function(str) {
    var fragments = {};
    
    var str = str.replace(FRAGMENT_REG, function(found) {
        var match = found.match(FRAGMENT_RE);
        fragments[match[1]] = match[2];
        return "";
    });
    
    fragments.yield = str;
    
    return fragments;
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
