var Request = require("jack/request").Request,
    Response = require("jack/response").Response,
    MIME = require("jack/mime").Mime;
    
var Template = require("nitro/template").Template;
    
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
 * The default Nitro app, dispatches HTTP Requests to action scripts.
 */    
var Dispatch = exports.Dispatch = function() {
    return function(env) {
        var request = new Request(env);
        var response = new Response();

        var path, ext, parts;
        
        parts = splitURI(request);
        path = parts[0];
        ext = parts[1];

        response.setHeader("X-Powered-By", "Nitro");
        response.setHeader("Content-Type", MIME.mimeType(ext) + "; charset=utf-8"); 

        var action, args;

        try {
            action = require(path + ext + ".js")[request.requestMethod()];
            args = action(request, response);
        } catch (e) {
            // no action.
        }
        
        if (typeof args === "string") {
            response.write(args);
        } else {
            var template;
            
            if (template = Template.load("root/" + path + ext)) {
                response.write(template.render(args || request.GET()));
            }
        }
        
        return response.finish();
    }
}

