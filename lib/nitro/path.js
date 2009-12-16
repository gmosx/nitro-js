var HashP = require("hashp").HashP,
    STATUS_WITH_NO_ENTITY_BODY = require("jack/utils").STATUS_WITH_NO_ENTITY_BODY,
    MIME_TYPES = require("jack/mime").MIME_TYPES;

var ContentType = require("jack/contenttype").ContentType;

/** 
 * Normalizes the request path.
 *
 * Path transformations:
 *   / -> /index.html 
 *   resource/*res-title -> resource/id?id=res-title
 *
 * If the optional base parameter is provided, it slices the base path, 
 * effectively mounting upstream applications at /.
 */
exports.Path = function(app) {

    var upstream = ContentType(app);
    
    return function(env) {
        if (!env["nitro.original_path_info"]) {
            env["nitro.original_path_info"] = String(env["PATH_INFO"]);
            env["nitro.original_query_string"] = String(env["QUERY_STRING"]);
        }
         
        var path = String(env["nitro.original_path_info"]);

        if ("/" == path) 
            path = "/index.html";
        else {
            //  resources/*res-title -> resources/id?id=res-title
            var parts = path.split("*");
            path = parts[0];
            var id = parts[1];

            if (id) {
                path += "id";
                if (env["nitro.original_query_string"]) {
                    env["QUERY_STRING"] = "id=" + id + "&" + env["nitro.original_query_string"];
                } else {
                    env["QUERY_STRING"] = "id=" + id;
                }
            }

            if (/\/$/.test(path)) path = path.replace(/\/$/, ".html");
            if (-1  == path.indexOf(".")) path = path + ".html";
        }
        
        env["PATH_INFO"] = path;

        return upstream(env);
    }
    
}

