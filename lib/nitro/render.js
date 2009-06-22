var JSON = require("json"),
	file = require("file");

var Template = require("template").Template;

/**
 * Render middleware.
 */
exports.Render = function(app) {

    var cache = {};
    
    var loadTemplate = function(path) {
        var template = cache[path];
        if (!template) {
            if (file.exists(path)) {
                template = new Template(file.read(path).toString(), path);
                if (!CONFIG.reload) cache[path] = template;
            } else
                return false;
        }
        return template;
    }

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
            	response[2] = [JSON.stringify(response[2])]; // FIXME, warn template not found?
            }
        }

        return response;
    }
    
}
