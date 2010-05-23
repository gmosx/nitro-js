var MEMCACHE = require("google/appengine/api/memcache"),
    CACHE = require("nitro/cache");
    
/**
 * Full response memcache middleware.
 */
exports.MemCache = exports.middleware = function (app, options) {
    if (options && options.seq) CACHE.seq = options.seq;
    
    return function (env) {
        var response = app(env),
            key = response.headers["Nitro-Memcache-Key"];

        delete response.headers["Nitro-Memcache-Key"];
                   
        if (key) {
//            print("--- key: " + key);
            if (response.body.length > 0) {
//                print("--- rendered, storing to memcache");
                MEMCACHE.set(key, response.body[0]);
            } else {
//                print("--- serving from memcache");
                var body = MEMCACHE.get(key);
                if (body) {
                    response.body = [body.toString()];
                }
            }
        }

        return response;
    }
}

