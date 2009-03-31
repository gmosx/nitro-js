var SeeOther = require("nitro/exceptions").SeeOther;

var Request = exports.Request = require("jack/request").Request;

/**
 * Redirect this request to another URI. This helper throws a SeeOther (307)
 * exception to skip the normal application middleware pipeline.
 */
Request.prototype.redirect = function(uri) {
    // TODO: ignore redirect in XHR requests!
    throw SeeOther(uri || this.referer());
}

var XHR_RE = new RegExp("XMLHttpRequest", "i");

/**
 * http://www.dev411.com/blog/2006/06/30/should-there-be-a-xmlhttprequest-user-agent
 */
Request.prototype.isXHR = Request.prototype.isXMLHTTPRequest = function() {
    return XHR_RE.test(this.env["HTTP_X_REQUESTED_WITH"]);
}
