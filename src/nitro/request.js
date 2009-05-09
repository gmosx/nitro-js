var Request = exports.Request = require("jack/request").Request;

/**
 * Redirect this request to another URI. 
 */
Request.prototype.redirect = function(location, status) {
    location = location || this.referer;
    return [status || 303, {"Location": location}, ['Go to <a href="' + location + '">' + location + "</a>"]];
}

var XHR_RE = new RegExp("XMLHttpRequest", "i");

/**
 * http://www.dev411.com/blog/2006/06/30/should-there-be-a-xmlhttprequest-user-agent
 */
Request.prototype.isXHR = Request.prototype.isXMLHTTPRequest = function() {
    return XHR_RE.test(this.env["HTTP_X_REQUESTED_WITH"]);
}
