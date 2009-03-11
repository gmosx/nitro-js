var HashP = require("hashp").HashP;

/** 
 * Normalizes the request and the response. Also provides special handling for 
 * id param:
 *   resource/*res-title -> resource/id?id=res-title
 *
 * This functionality should be implemented in a downstream node.
 */
var Normalize = exports.Normalize = function(app) {
    
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
    
        var response = app(env);

        var headers = response[1];
        HashP.set(headers, "X-Powered-By", "Nitro");
//      response.setHeader("Content-Type", MIME.mimeType(ext) + "; charset=utf-8"); 
        
        return response;
    }
    
}
