/**
 * A template extension for standard narwhal templates. Provides:
 *  - Template loading helper
 *  - Template extension mechanism (Django style, Rails layout style)
 *  - Template inclusion mechanism 
 *
 * Enhances the Template object with .load() and .filter() functions.
 */
 
var file = require("file"),
    Template = require("template").Template;

var EXTENDS_RE = /\{\.extends ["|'](.*?)["|']\}/;

// Cache compiled templates.
var cache = {};

var loadSource = function(path) {
    if (file.exists(path)) {
        return filterTemplate(file.read(path).toString());
    } else {
        return false;
    }
}

exports.Template = Template;

/**
 * Load a template relative to CONFIG.templateRoot. Applies filterTemplate to the
 * template.
 */
var loadTemplate = Template.load = function(path) {
    path = CONFIG.templateRoot + path; 

    var template = cache[path];
    
    if (!template) {
        var src = loadSource(path);
        if (src) {
            template = new Template(src);
            cache[path] = template;
        } else
            return false;
    }

    return template;
}

/**
 * A template filter that provides Django/Rails-style template extension/layout
 * and template inclusion functionality.
 */
var filterTemplate = Template.filter = function(src) {
    var match = src.match(EXTENDS_RE);
    if (match) {        
        src = src.replace(EXTENDS_RE, "");
        
        parent = loadTemplate(match[1]);
        if (!parent) throw new Error("Parent template '" + match[1] + "' not found");
        
        return resolveIncludes(parent.render(extractBlocks(src)));
    } else
        return resolveIncludes(src);
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
        return loadSource(CONFIG.templateRoot + path);        
    });
}
