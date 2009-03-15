var HashP = require("hashp").HashP;

var Response = exports.Response = require("jack/response").Response;

/**
 * Add response data. 
 * The specila X-Set-Data header is used to store response data. Downstream
 * apps can use the data to perform calculations or rendering.
 */
Response.prototype.setData = function(data) {
    var setData = this.getHeader("X-Set-Data");
    
    if (undefined == setData) {
        this.setHeader("X-Set-Data", data);
    } else {
        // TODO: optimize?
        this.setHeader("X-Set-Data", HashP.merge(data, setData));
    }
}

/**
 * Send a HTTP redirect.
 */
Response.prototype.redirect = function(uri, status) {
    // TODO: optimize?
    throw { status: status || 303, uri: uri, exceptionType: "HttpRedirect" };
}

