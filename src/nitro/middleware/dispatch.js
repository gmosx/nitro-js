var Response = require("jack/response").Response;
var File = require("io/file").File;

// TODO: Convert to LRU.
var apps = {};

// Special require for apps. Checks if the file is changed before reusing the
// cached version.
var requireApp = function(path) {
    path += ".js";
    var lm = File.lastModified("scripts" + path);
    
    if (0 != lm) { // lm == 0 if the file does not exist.
        var key = path + lm;
        if (!apps[key]) apps[key] = requireForce(path.replace(/^\//, ""));
        return apps[key].app;
    }
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
            return app(env);
        } else {
            return new Response("Not found: " + path, 404).finish();
        }
    }

}
