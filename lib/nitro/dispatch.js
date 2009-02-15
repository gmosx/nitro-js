var Request = require("jack/request").Request,
    Response = require("jack/response").Response,
    MIME = require("jack/mime").Mime;
    
/* 
 * Split the Request uri into path and ext (extension) components. 
 * Also provides special handling for id argument:
 * resource/*res-title -> resource/id?id=res-title
 */
var splitURI = function(request) {
    path = request.pathInfo().split("?")[0];

    if ("/" == path) path = "/index.html";

    var path, ext, id, parts
    
    parts = path.split(".");
    path = parts[0];
    ext = parts[1];
    
    if (ext) {
        ext = "." + ext;
    } else {
        ext = ".html";
    }
    
    parts = path.split("*");
    path = parts[0];
    id = parts[1];
    
    if (id) {
        request.params().id = id;
        path += "id";
    }
        
    return [path.replace(/^\//, ""), ext];
}

/**
 * Dispatch
 * The default Nitro middleware, dispatches HTTP Requests to action scripts.
 */    
var Dispatch = exports.Dispatch = function() {
    return function(env) {
        var request = new Request(env);
        var response = new Response();

        var path, ext, parts;
        
        parts = splitURI(request);
        path = parts[0];
        ext = parts[1];
        
        response.setHeader("Content-Type", MIME.mimeType(ext));

        var action = require(path + ext + ".js")[request.requestMethod()];

        var res = action(request, response);
/*        
        var template = Template.load();
        var body = template.render(args);
        response.write(body);
        response.write("nitro");
*/        
        return response.finish();
    }
}


/*
        response.write("Handled by Nitro Dispatch " + request.params("id") + " || " + path + "." + ext + '  <a href="/kookriko">koko</a>" ' + request.referer());
*/

