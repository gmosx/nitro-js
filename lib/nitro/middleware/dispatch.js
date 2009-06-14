var sandbox = require("sandbox").sandbox,
    canonical = require("file").canonical;

var Request = require("nitro/request").Request;
   
/**
 * A middleware that selects an app from the root tree.
 * In essence it acts like a Unix shell (or like PHP ;-))
 * This is the *right thing* to do!
 */
var Dispatch = exports.Dispatch = function() {

    return function(env) {
        var path = env["PATH_INFO"].split(".")[0];

        if (!Dispatch.root) Dispatch.root = canonical(CONFIG.root);
        
        try {
        	var app;
        	if (CONFIG.reload) {
        		app = sandbox(Dispatch.root + path, system, { loader : require.loader });
        	} else {
        		app = require(Dispatch.root + path); 
        	}

            // THINK: Useful helper?
            env.request = new Request(env);

            var action = app[env["REQUEST_METHOD"]];
			if (action) {
			    var response = action(env);
			    if (!Array.isArray(response)) {
			        return  [200, {}, response || {}];
			    } else
			        return response;
			} else {
				return [404, {}, []];
			}
        } catch (e) {
            print(e);
            if (/^Error: require error/.test(e.toString())) { // FIXME: a better test needed here!
            	return [404, {}, []];
            } else
                throw e;
        }
    }

}

