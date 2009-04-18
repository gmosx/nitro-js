var FileCache = require("nitro/utils/filecache").FileCache,
    Request = require("nitro/request").Request;
   
/**
 * A middleware that selects an app from the root tree.
 * In essence it acts like a Unix shell (or like PHP ;-))
 * This is the *right thing* to do!
 */
exports.Dispatch = function(root) {

    root = root || "root";
    
    var cache = new FileCache(function(path) {
        return require(path.replace(/^\//, ""));
    });

    return function(env) {
        var path = env["PATH_INFO"].split(".")[0];
        
        try {
            var app = require(root + path); // FIXME: require force needed!

            // THINK: Useful helper?
            env.request = new Request(env);

            var response = app[env["REQUEST_METHOD"]](env);

            if (!Array.isArray(response)) {
                return  [200, {}, response || {}];
            } else
                return response;
        } catch (e) {
            if (/^Error: require error/.test(e.toString())) { // FIXME: a better test needed here!
                return [404, {}, e.toString()];
            } else
                throw e;
        }
    }

}
