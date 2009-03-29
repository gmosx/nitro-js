var SeeOther = require("nitro/exceptions").SeeOther;

var Request = exports.Request = require("jack/request").Request;

/**
 * Return the session associated with this request. The session is lazily 
 * deserialized.
 */
Request.prototype.session = function() {
    var env = this.env;
    if (!env["NITRO_SESSION"]) {
        env["NITRO_SESSION"] = env["NITRO_SESSION_LOADER"](env);
    }
    return env["NITRO_SESSION"]; 
}

/**
 * Redirect this request to another URI. This helper throws a SeeOther (307)
 * exception to skip the normal application middleware pipeline.
 */
Request.prototype.redirect = function(uri) {
    // TODO: ignore redirect in XHR requests!
    throw SeeOther(uri || this.referer());
}
