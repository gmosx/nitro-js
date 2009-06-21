var HashP = require("hashp").HashP,
    STATUS_WITH_NO_ENTITY_BODY = require("jack/utils").STATUS_WITH_NO_ENTITY_BODY,
    MIME_TYPES = require("jack/mime").MIME_TYPES;

/**
 * This middleware makes sure that the Content-Type header is set for responses
 * that require it.
 */
exports.ContentType = function(app) {
    
    return function(env) {
        env["CONTENT_TYPE"] = env["CONTENT_TYPE"] || MIME_TYPES["." + env["PATH_INFO"].split(".")[1]];

        var response = app(env);

        if (!STATUS_WITH_NO_ENTITY_BODY(response[0]))
            if (!HashP.get(response[1], "Content-Type")) 
                HashP.set(response[1], "Content-Type", env["CONTENT_TYPE"]);
        
        return response;
    }
    
}
