var HashP = require("hashp").HashP;

/**
 * Create an HTTP Cookie.
 */
var Cookie = exports.Cookie = function(key, value) {
    var domain, path, expires, secure, httponly;
    
    var cookie = encodeURIComponent(key) + "=", 
        meta = "";
    
    if (typeof value === "object") {
        if (value.domain) meta += "; domain=" + value.domain ;
        if (value.path) meta += "; path=" + value.path;
        if (value.expires) meta += "; expires=" + value.expires.toGMTString();
        if (value.secure) meta += "; secure";
        if (value.httpOnly) meta += "; HttpOnly";
        value = value.value;
    }

    if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) cookie += encodeURIComponent(value[i]);
    } else {
        cookie += encodeURIComponent(value);
    }
 
    this.cookieString = cookie + meta;
}

/**
 * Set the cookie into the Response headers.
 */
Cookie.prototype.setHeader = function(headers) {
    var setCookie = HashP.get(headers, "Set-Cookie");
    
    if (!setCookie) {
        HashP.set(headers, "Set-Cookie", this.cookieString);
    } else if (typeof setCookie === "string") {
        HashP.set(headers, "Set-Cookie", [setCookie, this.cookieString]);
    } else { // Array
        setCookie.push(this.cookieString);
        HashP.set(this.headers, "Set-Cookie", setCookie);
    }
}
