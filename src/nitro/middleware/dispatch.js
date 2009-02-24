var File = require("io/file").File;

var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response,
    FileCache = require("nitro/utils/filecache").FileCache;
    
var cache = new FileCache(function(path) {
    return requireForce(path.replace(/^\//, ""));
});

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
        
        var app = cache.get("scripts" + path + ".js");
 
        if (app) {
            return run(app, env);
        } else {
            return new Response("Not found: " + path, 404).finish();
        }
    }

}
