var HashP = require("hashp").HashP;

/** 
 * Normalizes the request. Also provides special handling for id param:
 * resource/*res-title -> resource/id?id=res-title
 * This functionality should be implemented in a downstream node.
 */
var Normalize = exports.Normalize = function(app) {
    
    return function(env) {
        var path = env["PATH_INFO"];

        if ("/" == path) path = "/index.html";
        if (-1  == path.indexOf(".")) path = path + ".html";

        env["PATH_INFO"] = path;

        var response = app(env);
        var headers = response[1];

        HashP.set(headers, "X-Powered-By", "Nitro");
//      response.setHeader("Content-Type", MIME.mimeType(ext) + "; charset=utf-8"); 
        
        return response;
    }
    
}
