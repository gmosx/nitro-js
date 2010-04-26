var HashP = require("hashp").HashP,
    STATUS_WITH_NO_ENTITY_BODY = require("jack/utils").STATUS_WITH_NO_ENTITY_BODY,
    MIME_TYPES = require("jack/mime").MIME_TYPES;

var ContentType = require("jack/contenttype").ContentType;

/** 
 * Normalizes the request path.
 *
 * Path transformations:
 *   / -> /index.html 
 */
exports.Path = function(app) {

    var upstream = ContentType(app);
    
    return function(env) {
        if (!env["nitro.original_path_info"]) {
            env["nitro.original_path_info"] = String(env["PATH_INFO"]);
        }
         
        var path = env["PATH_INFO"];

        if ("/" == path) 
            path = "/index.html";
        else {
            if (/\/$/.test(path)) path = path.replace(/\/$/, ".html");
            if (!MIME_TYPES[path.slice(path.lastIndexOf("."))]) {
                path = path + ".html";
            }
        }
        
        env["PATH_INFO"] = path;

        return upstream(env);
    }
    
}

