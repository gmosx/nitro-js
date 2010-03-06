/**
 * http://tomayko.com/src/rack-cache/
 * http://www.xml.com/lpt/a/1642
 * http://guides.rubyonrails.org/caching_with_rails.html#conditional-get-support
 * http://fishbowl.pastiche.org/2002/10/21/http_conditional_get_for_rss_hackers/
 */

var memcache = require("google/appengine/api/memcache"),
    Hash = require("hash").Hash,
    Response = require("nitro/response").Response;

/** 
 * Increase the seq parameter to invalidate all published etags. 
 */
exports.seq = 1;

/**
 * Enable or disable the cache.
 */
exports.enabled = true;

/**
 * Full page caching middleware.
 */
exports.PageCache = function(app) {
    return function(env) {
        var response = app(env),
            key = response.headers["Nitro-Memcache-Key"];

        delete response.headers["Nitro-Memcache-Key"];
                   
        if (key) {
//            print("--- key: " + key);
            if (response.body.length > 0) {
//                print("--- rendered, storing to memcache");
                memcache.set(key, response.body[0]);
            } else {
//                print("--- serving from memcache");
                var body = memcache.get(key);
                if (body) {
                    response.body = [body.toString()];
                }
            }
        }

        return response;
    }
}

exports.cacheLastMofified = function(env, lm, app) {
    if (!exports.enabled) return app(env);

    var etag = '"' + lm.getTime().toString() + ":" + exports.seq + '"';
    
    if (env["HTTP_IF_NONE_MATCH"] == etag) {
//        print("--not modified");
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
//            print("--- memcache hit");
            return { headers: headers };
        } else {             
//            print("--- rendering");
            var response = app(env);
            response.headers = Hash.merge(headers, response.headers);
            return response;
        }
    }        
}

exports.cacheLastMofifiedFragment = function(env, lm, path, app) {
    if (!exports.enabled) return app(env);

    var etag = lm.getTime().toString() + ":" + exports.seq,
        mkey = "frg://" + path + ":" + etag,
        fragment = memcache.get(mkey);
        
    if (fragment) {
//        print("--- memcache hit");
        return fragment;
    } else {             
//        print("--- rendering");
        var fragment = app(env);
        memcache.set(mkey, fragment);
        return fragment;
    }
}

exports.staticResponse = function(days, headers) {    
    var response = {headers: headers || {}, data: {}};
    
    if (exports.enabled) {
        var d = new Date();
            seconds = (days || 30) * 86400000;
     
        d.setTime(d.getTime() + seconds);
     
        response.headers["Cache-Control"] = "public; max-age=" + seconds;
        response.headers["Expires"] = d.toGMTString();
    }
        
    return response;
}
