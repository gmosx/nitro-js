var canonical = require("file").canonical;

var Request = require("jack/request").Request;

/**
 * A middleware that selects an app from the root tree.
 * In essence it acts like a Unix shell (or like PHP ;-))
 * This is the *right thing* to do!
 *
 * root = the apps root directory.
 * sitemap = the sitemap (optional, to support 'nice' urls)
 */
var Dispatch = exports.Dispatch = function(root, sitemap) {

    root = canonical(root || "src/root");
    sitemap = sitemap || {};

    var dispatch = function(env) {
        var path = realPath(env, sitemap);
        
        try {
        	var app = require(root + path); 
        	
            var action = app[env["REQUEST_METHOD"]];
		    if (action) {
		        var response = action(env);
		        return response ? defaults(response) : {status: 200, headers: {}, data: {}};
		    } else
                return {status: 404, headers: {}, body: ["'" + env["PATH_INFO"] + "' does not respond to HTTP method '" + env["REQUEST_METHOD"] + "'"]};
        } catch (e) {
            if (/^require error/.test(e.toString())) // FIXME: a better test needed here!
                return {status: 404, headers: {}, body: ["File not found.<br />" + e.toString()]};
            else
                throw e;
        }
    }

    return function(env) {
        env.dispatch = dispatch;
        return dispatch(env);
    }
    
}

/**
 */
// TODO: apply in GET requests only.
var realPath = exports.realPath = function(env, sitemap) {
    var pathInfo = env["PATH_INFO"],
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
    
    return path;
}

var defaults = function(response) {
    if (!response.status) response.status = 200;
    if (!response.headers) response.headers = {};
    if (!response.body) response.body = [];

    return response;
}
