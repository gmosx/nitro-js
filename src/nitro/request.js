
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
