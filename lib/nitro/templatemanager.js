var file = require("file");

exports.templatesRoot = "src/templates";

/**
 * Template loading and preprocessing.
 */
var TemplateManager = exports.TemplateManager = function(root, engine) {
    this.root = root || exports.templatesRoot;
    this.Template = require(engine || "template").Template;
    this.cache = {};    
}

/**
 * Load, preprocess and compile a template.
 */
TemplateManager.prototype.load = function(path) {
    var template = this.cache[path];
    
    if (!template) {
        var src = this.loadSource(path);
        if (src) {
            this.cache[path] = template = new this.Template(src);
        } else {
            return false; // FIXME: better throw here?
        }
    }

    return template;
}

/**
 * Load the template source relative to the template root dir.
 */
TemplateManager.prototype.loadSource = function(path) {
    path = this.root + path; 
    if (file.exists(path)) {
          return this.filterTemplate(file.read(path, "b").decodeToString("utf-8"));
    } else {
        return false;
    }
}

var EXTENDS_RE = /\{\.extends ["|'](.*?)["|']\}/;

/**
 * A template filter that provides Django/Rails-style template extension/layout
 * and template inclusion functionality.
 */
TemplateManager.prototype.filterTemplate = function(src) {
    var match = src.match(EXTENDS_RE);
    if (match) {        
        src = src.replace(EXTENDS_RE, "");
        
        parent = this.load(match[1]);
        if (!parent) throw new Error("Parent template '" + match[1] + "' not found");
        
        return resolveIncludes(parent.render(extractBlocks(src)), this);
    } else {
        return resolveIncludes(src, this);
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
 *   {.include "/path/to/fragment"}
 */
var resolveIncludes = function(str, manager) {
    return str.replace(INCLUDE_RE, function(match) {
        var path = match.split(/["|']/)[1];
        return manager.loadSource(path) || "error: '" + path + "' not found!";        
    });
}

/**
 * A helper to load templates from JSGI apps.
 */
exports.load = function(path) {
    return new TemplateManager().load(path);
}
