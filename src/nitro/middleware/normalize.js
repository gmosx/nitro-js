var HashP = require("hashp").HashP,
    STATUS_WITH_NO_ENTITY_BODY = require("jack/utils").STATUS_WITH_NO_ENTITY_BODY,
    MIME_TYPES = require("jack/mime").Mime.MIME_TYPES;

var ContentType = require("nitro/middleware/contenttype").ContentType;

/** 
 * Normalizes the request and the response. Also provides special handling for 
 * id param:
 *   resource/*res-title -> resource/id?id=res-title
 *
 * This functionality should be implemented in a downstream node.
 *
 * TODO: Split this in multiple middleware classes.
 */
exports.Normalize = function(app) {

    var upstream = ContentType(app);
    
    return function(env) {
        var path = env["PATH_INFO"];

        if ("/" == path) 
            path = "/index.html";
        else {
            // Special 'id param' rewrite:
            //  resources/*res-title -> resources/id?id=res-title
            var parts = path.split("*");
            path = parts[0];
            var id = parts[1];

            if (id) {
                path += "id";
                if (env["QUERY_STRING"]) {
                    env["QUERY_STRING"] = "id=" + id + "&" + env["QUERY_STRING"];
                } else {
                    env["QUERY_STRING"] = "id=" + id;
                }
            }

            if (-1  == path.indexOf(".")) path = path + ".html";
        }
        
        env["PATH_INFO"] = path;

        var response = upstream(env);

        //HashP.set(response[1], "X-Powered-By", "Nitro");
        
        return response;
    }
    
}

