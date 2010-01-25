/**
 * Normal Template loading and preprocessing.
 */

var FILE = require("file"),
    TEMPLATE = require("normal-template"),
    TPP = require("normal-template/tpp");

/**
 * Root directory for template files.
 */
exports.templatesRoot = "src/templates";

/**
 * The options to pass to the template compiler.
 * By default html escaping is applied for extra security.
 */
exports.compileOptions = {filters: {defaultfilter: TEMPLATE.filters.html}};

// Cache the compiled templates.
var cache = {};

/**
 * Load, preprocess and compile a template.
 */
exports.get = exports.load = function(path) {
    var template = cache[path];
    
    if (!template) {
        cache[path] = template = compileTemplate(path);
    }

    return template;
}

var loadTemplate = function(path) {
    path = exports.templatesRoot + path;

    try {
        return FILE.read(path, "b").decodeToString("UTF-8");
    } catch (e) {
        return false;
    }    
/*  FIXME: does not work on Google App Engine.
    if (FILE.exists(path)) {
        return FILE.read(path, "b").decodeToString("UTF-8");
    } else {
        return false;
    }
*/    
}

var compileTemplate = function(path) {
    var t, src,
        st, stSrc, stPath;
    
    if (src = loadTemplate(path)) {
        if (stPath = TPP.getTemplatePath(src)) {
            // The template defines values for a super-template.
            if (stSrc = loadTemplate(stPath)) {
                stSrc = TPP.expandIncludes(stSrc, loadTemplate); // TODO: recursively expand includes!
                st = TEMPLATE.compile(stSrc);
                src = TPP.expandIncludes(src, loadTemplate); // TODO: recursively expand includes!
                var data = TPP.extractData(src);
                src = st(data);
                return TEMPLATE.compile(src, exports.compileOptions);
            } else {
                throw new Error("Template '" + stPath + "' not found");
            }
        } else {
            src = TPP.expandIncludes(src, loadTemplate); // TODO: recursively expand includes!
            return TEMPLATE.compile(src, exports.compileOptions);
        }
    } else {
        throw new Error("Template '" + path + "' not found");
    }   
}
