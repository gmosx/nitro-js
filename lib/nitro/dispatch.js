var FILE = require("file");

var Request = require("jack/request").Request;

/**
 * A middleware that selects an app from the root tree.
 * In essence it acts like a Unix shell (or like PHP ;-))
 * This is the *right thing* to do!
 *
 * Options:
 *  dispatchRoot: the root directory for 'apps'.
 *  sitemap = the sitemap (optional, provides 'nice' urls support)
 */
var Dispatch = exports.Dispatch = function(options) {

    if (!options) options = {};

    var root = FILE.canonical(options.dispatchRoot || "src/root"),
        sitemap = options.sitemap;

    var dispatch = function(env, path) {
        path = realPath(path, env, sitemap);
/*
        if (true) { //(env["nitro.debug"]) {
            require = require("sandbox").Sandbox({
                "system": system,
                "loader": require.loader,
                "debug": require.loader.debug
            });
        }*/

    	var app;
    	
    	try {
        	app = require(root + path); 
        } catch (e) {
            if (FILE.exists(root + path + ".js")) {
                throw e;
            } else {
                return {status: 404, headers: {}, body: ["Action not found", e.toString()]};
            }
        }
    	
        var action = getAction(app, env["REQUEST_METHOD"]);
        
	    if (action) {
	        var response = action(env);
	        return response ? defaults(response) : {status: 200, headers: {}, body: [], data: {}};
	    } else {
            return {status: 404, headers: {}, body: ["'" + env["PATH_INFO"] + "' does not respond to HTTP method '" + env["REQUEST_METHOD"] + "'"]};
        }
    }

    return function(env) {
        env.dispatch = dispatch;
        return dispatch(env);
    }
    
}

var getAction = function(app, requestMethod) {
    if ((requestMethod == "HEAD") && (!app[requestMethod])) {
        // If the app has no HEAD method use the GET method.
        return app.GET;
    }
    
    return app[requestMethod];
}

/**
 * Use the optional sitemap to provide 'nice' urls.
 */
// TODO: apply in GET requests only.
var realPath = exports.realPath = function(path, env, sitemap) {
    var pathInfo = path || env["PATH_INFO"],
        fullPath = pathInfo.slice(0, pathInfo.lastIndexOf(".")),
        path = fullPath,
        idx;

    if (sitemap) {
        while (!sitemap[path]) {
            idx = path.lastIndexOf("/");
            if (idx < 0) return fullPath; // THINK: or not found?
            path = path.slice(0, idx);    
        }

        if (idx) {
            new Request(env).GET()["args"] = fullPath.slice(idx + 1).split("/");
        }
    }

    env["PATH_INFO"] = path + "." + pathInfo.split(".")[1];
    
    return path;
}

var defaults = function(response) {
    if (!response.status) response.status = 200;
    if (!response.headers) response.headers = {};
    if (!response.body) response.body = [];

    return response;
}
