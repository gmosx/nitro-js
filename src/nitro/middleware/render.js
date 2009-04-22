var file = require("file"),
    Template = require(CONFIG.template || "nitro/template").Template;

var FileCache = require("nitro/utils/filecache").FileCache;

var loadTemplate = function(path) {
    try {
        var src = file.read(path).toString();
        return new Template(src, path);
    } catch (e) {
        return null;
    }
}

var cache = new FileCache(loadTemplate);

/**
 * Render middleware.
 */
exports.Render = function(app, templateRoot) {

    templateRoot = templateRoot || "src/root";

    // The request parameters are not used as template arguments by default, 
    // this is a major security risk!
    //
    // THINK: only render templates for GET requests (override if neccessary in
    // upstream)?
    return function(env) {
        var response = app(env);
        
        // FIXME: better test here.
        if ((typeof(response[2]) != "string") && (response[1]["Transfer-Encoding"] != "chunked")) {
            var template = loadTemplate(templateRoot + env["PATH_INFO"]);
            if (template)
                response[2] = template.render(response[2]);
        }

        return response;
    }
    
}

