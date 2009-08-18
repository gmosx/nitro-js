var isArray = Array.isArray;

var canonical = require("file").canonical;

var Request = require("nitro/request").Request;

var notFound = require("nitro/response").notFound;
   
/**
 * A middleware that selects an app from the root tree.
 * In essence it acts like a Unix shell (or like PHP ;-))
 * This is the *right thing* to do!
 */
var Dispatch = exports.Dispatch = function() {
    
    var root;

    return function(env) {
        var path = env["PATH_INFO"].split(".")[0];

        if (!root) root = canonical(CONFIG.root);

        try {
        	var app = require(root + path); 

            // Add this as a helper.
            env.request = new Request(env);

            var action = app[env["REQUEST_METHOD"]];
			if (action) {
			    var response = action(env);
			    if (!response) throw new Error("No response from upstream app");
			    return response;
			} else
				return notFound("'" + env["PATH_INFO"] + "' does not respond to HTTP method '" + env["REQUEST_METHOD"] + "'");
        } catch (e) {
            if (/^Error: require error/.test(e.toString())) // FIXME: a better test needed here!
                return notFound("'" + env["PATH_INFO"] + "' not found");
            else
                throw e;
        }
    }

}

