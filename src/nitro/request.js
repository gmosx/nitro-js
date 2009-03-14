
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
 * http://code.google.com/apis/gdata/docs/2.0/basics.html#UpdatingEntry
 */
Request.prototype.requestMethod = function() { 
    return this.GET()["_method"] || this.env["X-HTTP-Method-Override"] || this.env["REQUEST_METHOD"];            
};

