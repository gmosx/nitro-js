var file = require("file");

var FileCache = require("nitro/utils/filecache").FileCache;

/**
 * Render middleware.
 */
exports.Render = function(app, Template, templateRoot) {

    templateRoot = templateRoot || (CONFIG.templateRoot) || "src/root";
    Template = Template || require("nitro/template").Template;

    // FIXME: don't catch exceptions here.
    var loadTemplate = function(path) {
        try {
            var src = file.read(path).toString();
            print(path);
            return new Template(src, path);
        } catch (e) {
        	print(e);
            print(String((e.rhinoException && e.rhinoException.printStackTrace()) || (e.name + ": " + e.message)));
            return null;
        }
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
        if ((response[0] == 200) && (typeof(response[2]) != "string") && (response[1]["Transfer-Encoding"] != "chunked")) {
            var template = loadTemplate(templateRoot + env["PATH_INFO"]);
            if (template) {
                response[2] = template.render(response[2]);
            } else {
            	response[2] = "Template '" + env["PATH_INFO"] + "'not found";
            }
        }

        return response;
    }
    
}

