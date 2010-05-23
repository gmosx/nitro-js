/**
 * http://tomayko.com/src/rack-cache/
 * http://www.xml.com/lpt/a/1642
 * http://guides.rubyonrails.org/caching_with_rails.html#conditional-get-support
 * http://fishbowl.pastiche.org/2002/10/21/http_conditional_get_for_rss_hackers/
 */

var MEMCACHE = require("google/appengine/api/memcache"),
    Hash = require("narwhal/hash").Hash,
    Response = require("jack/response").Response;

/** 
 * Increase the seq parameter to invalidate all published etags. 
 */
exports.seq = 1;

/**
 * Enable or disable the cache.
 */
exports.enabled = true;

/**
 * Cache the whole response.
 */
exports.cacheLastMofified = function (env, lm, app) {
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
        
        if (MEMCACHE.get(mkey)) {
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

/**
 * Cache a fragment.
 */
exports.cacheLastMofifiedFragment = function (env, lm, path, app) {
    if (!exports.enabled) return app(env);

    var etag = lm.getTime().toString() + ":" + exports.seq,
        mkey = "frg://" + path + ":" + etag,
        fragment = MEMCACHE.get(mkey);
        
    if (fragment) {
//        print("--- memcache hit");
        return fragment;
    } else {             
//        print("--- rendering");
        var fragment = app(env);
        MEMCACHE.set(mkey, fragment);
        return fragment;
    }
}

/**
 * Generate a static response.
 */
var staticResponse = exports.staticResponse = function (days, headers) {    
    var response = {headers: headers || {}, data: {}};
    
    if (exports.enabled) {
        var d = new Date(),
            seconds = (days || 30) * 86400000;
     
        d.setTime(d.getTime() + seconds);
     
        response.headers["Cache-Control"] = "public; max-age=" + seconds;
        response.headers["Expires"] = d.toGMTString();
    }
        
    return response;
}

/**
 * A jsgi app that returns a static response.
 */
exports.staticApp = function (env) {
    return staticResponse();
}

/** 
 * Used by the deploy tool to prerender the action as a static file. 
 */
exports.staticApp.isStatic = true;
