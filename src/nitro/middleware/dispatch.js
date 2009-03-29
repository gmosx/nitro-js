var FileCache = require("nitro/utils/filecache").FileCache,
    Request = require("nitro/request").Request;
   
/**
 * A middleware that selects an app from the root tree.
 * In essence it acts as the Unix shell (or PHP ;-))
 */
exports.Dispatch = function(root) {

    root = root || "root";
    
    var cache = new FileCache(function(path) {
        return require(path.replace(/^\//, ""));
    });

    return function(env) {
        var path = env["PATH_INFO"].split(".")[0];
        
//        var app = cache.get(root + path + ".js");
        var app = require(root + path);
        
        if (app) {
            // THINK: Useful helper?
            env.request = new Request(env);

// FIXME: use methodoverride filter!                          
//            var response = app[env["REQUEST_METHOD"]](env);
            var response = app[env.request.requestMethod()](env);
            if (!isArray(response)) {
                return  [200, {}, response];
            } else
                return response;
        } else
            return [404, {}, ""];
    }

}
