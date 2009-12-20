var memcache = require("google/appengine/api/memcache"),
    Hash = require("hash").Hash,
    Response = require("nitro/response").Response;

/** 
 * Increase the build parameter to invalidate all published etags. 
 */
exports.build = 1;

/**
 * Enable or disable the cache.
 */
exports.enabled = false;

/**
 * Full page caching middleware.
 */
exports.PageCache = function(app) {
    return function(env) {
        var response = app(env),
            key = response.headers["Nitro-Memcache-Key"];
            
        if (key) {
            print("--- key: " + key);
            if (response.body.length > 0) {
                print("--- rendered, storing to memcache");
                memcache.set(key, response.body[0]);
            } else {
                print("--- serving from memcache");
                response.body = [memcache.get(key).toString()];
            }
        }
        
        return response;
    }
}

exports.cacheLastMofified = function(env, lm, app) {
    if (!exports.enabled) return app(env);

    var etag = lm.getTime().toString() + ":" + exports.build;
    
    if (env["HTTP_IF_NONE_MATCH"] == etag) {
        print("--not modified");
        return Response.notModified();
    } else {
        var mkey = "frg://" + env["nitro.original_path_info"] + "?" + env["QUERY_STRING"] + ":" + etag,
            headers = {
                "Cache-Control": "public; must-revalidate",
                "Last-Modified": lm.toGMTString(),
                "ETag": etag,
                "Nitro-Memcache-Key": mkey
            };
        
        if (memcache.get(mkey)) {
            print("--- memcache hit");
            return { headers: headers };
        } else {             
            print("--- rendering");
            var response = app(env);
            response.headers = Hash.merge(headers, response.headers);
            return response;
        }
    }        
}

exports.cacheLastMofifiedFragment = function(env, lm, path, app) {
    if (!exports.enabled) return app(env);

    var etag = lm.getTime().toString() + ":" + exports.build,
        mkey = "frg://" + path + ":" + etag,
        fragment = memcache.get(mkey);
        
    if (fragment) {
        print("--- memcache hit");
        return fragment;
    } else {             
        print("--- rendering");
        var fragment = app(env);
        memcache.set(mkey, fragment);
        return fragment;
    }
}

