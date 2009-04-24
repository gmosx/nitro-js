var file = require("file"),
    Template = require(CONFIG.template || "nitro/template").Template;

var FileCache = require("nitro/utils/filecache").FileCache;

var cache = new FileCache(function(path) {
    try {
        var src = file.read(path).toString();
        return new Template(src, path);
    } catch (e) {
    	print(e);
        return null;
    }
});

/**
 * Render middleware.
 */
exports.Render = function(app, templateRoot) {

    templateRoot = templateRoot || (CONFIG.pathPrefix+"src/root");

    // The request parameters are not used as template arguments by default, 
    // this is a major security risk!
    //
    // THINK: only render templates for GET requests (override if neccessary in
    // upstream)?
    return function(env) {
        var response = app(env);
        
        // FIXME: better test here.
        if ((typeof(response[2]) != "string") && (response[1]["Transfer-Encoding"] != "chunked")) {
            var template = cache.get(templateRoot + env["PATH_INFO"]);
            if (template) {
                response[2] = template.render(response[2]);
            } else {
            	response[2] = "Template '" + env["PATH_INFO"] + "'not found";
            }
        }

        return response;
    }
    
}

