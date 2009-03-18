var FileCache = require("nitro/utils/filecache").FileCache;
    
/**
 * A middleware that selects another app from the root tree to dispatch the 
 * Request.
 */
exports.Dispatch = function() {

    var cache = new FileCache(function(path) {
        return requireForce(path.replace(/^\//, ""));
    });

    return function(request, response) {
        var parts = request.pathInfo().split("."), path = parts[0], ext = parts[1];
        
        var app = cache.get("src/root" + path + ".js");
 
        if (app) {
            var action = app[ext] || app["app"];
            action(request, response);
        } else {
            response.status = 404;
        }
    }

}
