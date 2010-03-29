var FILE = require("file"),
    TEMPLATE = require("normal-template"),
    TPP = require("normal-template/tpp");

/**
 * The default Nitro Template Engine is powered by Normal Template.
 *
 * Options:
 *  - templateRoot
 *  - compileOptions
 */
var NormalTemplateEngine = exports.NormalTemplateEngine = function(options) {
    if (!options) options = {};

     // Root directory for template files. 
    var templateRoot = this.templateRoot = options.templateRoot || "src/templates";

    // The options to pass to the template compiler.
    // By default html escaping is applied for extra security.
    this.compileOptions = options.compileOptions || {filters: {defaultfilter: TEMPLATE.filters.html}};
    
    // Cache for the compiled templates.
    this.cache = {};
 
    var loadTemplate = this.loadTemplate = function (path) {
        path = templateRoot + path;

        // FIXME: FILE.exists(path) does not work on GAE?
        try {
            return FILE.read(path, "b").decodeToString("UTF-8");
        } catch (e) {
            return false;
        }    
    }

    // Preprocess the template. Apply includes and render the optional 
    // meta-template.
    // HINT: function implemented inline to allow for passing loadTemplate
    // to expandIncludes.
    this.preprocessTemplate = function (src) {
        var st, stSrc, stPath;

        if (stPath = TPP.getTemplatePath(src)) {
            // The template defines values for a super-template.
            if (stSrc = loadTemplate(stPath)) {
                stSrc = TPP.expandIncludes(stSrc, loadTemplate);
                st = TEMPLATE.compile(stSrc);
                src = TPP.expandIncludes(src, loadTemplate);
                var data = TPP.extractData(src);
                src = st(data);
                return src;
            } else {
                throw new Error("Template '" + stPath + "' not found");
            }
        } else {
            src = TPP.expandIncludes(src, loadTemplate);
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
NormalTemplateEngine.prototype.get = function(path) {
    var template = this.cache[path];
    
    if (!template) {
        this.cache[path] = template = this.compileTemplate(path);
    }

    return template;
}
