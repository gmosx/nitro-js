var file = require("file"),
    Template = require("template").Template;

var EXTENDS_RE = /\{\.extends ["|'](.*?)["|']\}/;

// Cache compiled layouts.
var cache = {};

/**
 * A (Rails/Django-style) layout for templates. Implemented as a template filter 
 * to be used with the Render middleware.
 */
exports.filter = function(src) {
    var match = src.match(EXTENDS_RE);
    if (match) {        
        src = src.replace(EXTENDS_RE, "");
        
        var path = match[1];
        
        var layout = cache[path];
        if (!layout) {
            var str = file.read(CONFIG.templateRoot + path).toString();
            layout = cache[path] = new Template(resolveIncludes(str));
        }
        
        return resolveIncludes(layout.render(extractBlocks(src)));
    } else {
        return src;
    }
}

var BLOCK_RE = /\{\.block (\w*?)\}([\s\S]*?)\{\.end \1\}/;
var BLOCK_REG = /\{\.block (\w*?)\}([\s\S]*?)\{\.end \1\}/g;

/**
 * Extract blocks of content to be interpolated in the parent template.
 */
var extractBlocks = function(str) {
    var blocks = {};
    var str = str.replace(BLOCK_REG, function(found) {
        var match = found.match(BLOCK_RE);
        blocks[match[1]] = match[2];
        return "";
    });

    // pass whats left of the input template to the yield variable if yield
    // is not already defined.
    blocks.yield = blocks.yield || str;    
    
    return blocks;
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
