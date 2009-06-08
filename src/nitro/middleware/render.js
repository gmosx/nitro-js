var file = require("file");

var FileCache = require("nitro/utils/filecache").FileCache;

/**
 * Render middleware.
 */
exports.Render = function(app, Template) {

    Template = Template || require("nitro/template").Template;

    // FIXME: don't catch exceptions here.
    var loadTemplate = function(path) {
        if (file.exists(path)) {
            var src = file.read(path).toString();
            return new Template(src, path);
        } else
            return false;
    }

    var cache = new FileCache(loadTemplate);

    // The request parameters are not used as template arguments by default, 
    // this is a major security risk!
    //
    // THINK: only render templates for GET requests (override if neccessary in
    // upstream)?
    return function(env) {
        var response = app(env);

        // FIXME: better test here.
        if ((typeof(response[2]) == "object") && (!Array.isArray(response[2])) && (response[1]["Transfer-Encoding"] != "chunked")) { 
            var template = loadTemplate(CONFIG.templateRoot + env["PATH_INFO"]);
            if (template) {
                response[2] = [template.render(response[2])];
            } else {
                // print("Template not found: " + CONFIG.templateRoot + env["PATH_INFO"]);
            	response[2] = []; // FIXME, warn template not found?
            }
        }

        return response;
    }
    
}
