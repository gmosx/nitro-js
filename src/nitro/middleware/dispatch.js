var Response = require("jack/response").Response;
var File = require("io/file").File;

// Split the path info into path and extension components. 
// TODO: move rewrites to another middleware or downstream.
var parsePathInfo = function(env) {
    var path = env["PATH_INFO"].toString().split("?")[0];
    if ("/" == path) path = "/index.html";

    var parts = path.split(".");
    parts[1] = parts[1] || "html";
        
    return parts;
}

// TODO: Convert to LRU.
var apps = {};

// Special require for apps. Checks if the file is changed before reusing the
// cached version.
var requireApp = function(path) {
    path = path.replace(/^\//, "") + ".app.js";
    
    var lm = File.lastModified("root/" + path);
    
    if (0 != lm) { // lm == 0 if the file does not exist.
        var key = path + lm;
        if (!apps[key]) apps[key] = requireForce(path);
        return apps[key].app;
    }
}

/**
 * A Jack middleware app that selects another app from the root tree to 
 * dispatch the Request.
 */
var Dispatch = exports.Dispatch = function() {

    return function(env) {
        var parts = parsePathInfo(env), path = parts[0], ext = parts[1];

        var app = requireApp(path);
        if (app) {
            return app(env);
        } else {
            return new Response("Not found: " + path, 404).finish();
        }
    }

}
