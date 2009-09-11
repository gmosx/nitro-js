var canonical = require("file").canonical;

var Request = require("jack/request").Request;

/**
 * A middleware that selects an app from the root tree.
 * In essence it acts like a Unix shell (or like PHP ;-))
 * This is the *right thing* to do!
 *
 * root = the apps root directory.
 */
var Dispatch = exports.Dispatch = function(root) {

    root = canonical(root || "src/apps");

    return function(env) {
        var path = env["PATH_INFO"].split(".")[0];

        try {
        	var app = require(root + path); 
        	
            var action = app[env["REQUEST_METHOD"]];
			if (action) {
			    var response = defaults(action(env));
			    if (!response) throw new Error("No response from upstream app at " + env["PATH_INFO"]);
			    return response;
			} else
                return {status: 404, headers: {}, body: ["'" + env["PATH_INFO"] + "' does not respond to HTTP method '" + env["REQUEST_METHOD"] + "'"]};
        } catch (e) {
            if (/^require error/.test(e.toString())) // FIXME: a better test needed here!
                return {status: 404, headers: {}, body: ["'" + env["PATH_INFO"] + "' not found.<br />" + e.toString()]};
            else
                throw e;
        }
    }

}

var defaults = function(response) {
    if (!response.status) response.status = 200;
    if (!response.headers) response.headers = {};
    if (!response.body) response.body = [];

    return response;
}

