/**
 * @fileoverview A template engine wraps standard JavaScript templating solutions
 * for use with Nitro. A normal-template based engine is provided by default.
 */

var fs = require("fs"),
    OBJECT = require("ringo/utils/object"),
    TEMPLATE = require("normal-template"),
    tpp = require("normal-template/tpp");

/**
 * The default Nitro Template Engine is powered by Normal Template.
 * http://www.github.com/gmosx/normal-templateEngine
 *
 * Alternative template engines can be integrated with Nitro by creating 
 * wrapper modules with this interface.
 *
 * Options:
 *  - templateRoot
 *  - compileOptions
 *
 * @constructor
 */
var TemplateEngine = exports.TemplateEngine = function (options) {
    if (!options) options = {};

    // Root directory for template files. 
    var templateRoot = this.templateRoot = options.templateRoot || "src/templates";

    // The options to pass to the template compiler.
    // By default html escaping is applied for extra security.
    this.compileOptions = options.compileOptions || {filters: {defaultfilter: TEMPLATE.filters.html}};
    
    // Cache for the compiled templates.
    this.cache = {};
 
    var loadTemplate = this.loadTemplate = function (path) {
        path = fs.join(templateRoot, path);

        // FIXME: fs.exists(path) does not work on GAE?
//        try {
        return fs.read(path, {charset: "UTF-8"});
//        } catch (e) {
//            return false;
//        }    
    }

    // Preprocess the template. Apply includes and render the optional 
    // super-template (aka meta-template).
    // HINT: function implemented inline to allow for passing loadTemplate
    // to expandIncludes.
    this.preprocessTemplate = function (src) {
        var st, stSrc, stPath;

        if (stPath = tpp.getTemplatePath(src)) {
            // The template defines values for a super-template.
            if (stSrc = loadTemplate(stPath)) {
                stSrc = tpp.expandIncludes(stSrc, loadTemplate);
                st = TEMPLATE.compile(stSrc);
                src = tpp.expandIncludes(src, loadTemplate);
                var data = tpp.extractData(src);
                src = st(OBJECT.merge(data, options.tppData || {}));
                return src;
            } else {
                throw new Error("Template '" + stPath + "' not found");
            }
        } else {
            src = tpp.expandIncludes(src, loadTemplate);
            return src;
        }
    }

    // Compile the template.
    this.compileTemplate = function (path) {
        var src = loadTemplate(path);
        
        if (src) {
            return TEMPLATE.compile(this.preprocessTemplate(src), this.compileOptions);
        } else {
            throw new Error("Template '" + path + "' not found");
        }   
    }    
}

/**
 * Load, preprocess and compile a template.
 */
TemplateEngine.prototype.get = function (path) {
    var template = this.cache[path];
    
    if (!template) {
        this.cache[path] = template = this.compileTemplate(path);
    }

    return template;
}
