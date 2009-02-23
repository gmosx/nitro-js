var File = require("io/file").File;

var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;
    
// TODO: Convert to LRU.
var apps = {};

// Special require for apps. Checks if the file is changed before reusing the
// cached version.
var requireApp = function(path) {
    var lm = File.lastModified("scripts" + path + ".js");
    
    if (0 != lm) { // lm == 0 if the file does not exist.
        var key = path + lm;
        if (!apps[key]) apps[key] = requireForce(path.replace(/^\//, ""));
        return apps[key];
    }
}

// This simple method implements the (request, reponse) interface.
// Can this be refactored?
// THINK: Calls the .app function for all extensions, is this OK?
var run = function(app, env) {
    var request = new Request(env),
        response = new Response(),
        ext = request.pathInfo().split(".")[1];
    
    var action = app[ext] || app["app"];
        
    action(request, response);

    return response.finish();   
}

/**
 * A Jack middleware app that selects another app from the root tree to 
 * dispatch the Request.
 */
var Dispatch = exports.Dispatch = function() {

    return function(env) {
        var path = env["PATH_INFO"].split(".")[0];
        
        var app = requireApp(path);
 
        if (app) {
            return run(app, env);
        } else {
            return new Response("Not found: " + path, 404).finish();
        }
    }

}
