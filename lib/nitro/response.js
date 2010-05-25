try {
    var Response = exports.Request = require("ringo/webapp/request").Request;
    
    /**
     * Constructs a redirect (30x).
     */
    Response.redirect = function (location, status) {
        return {
            status: status || 302,
            headers: {"Location": location},
            body: ['Go to <a href="' + location + '">' + location + "</a>"]
        }
    }

    /**
     * Constructs a success (200) response.
     */
    Response.ok = function () {
        return {status: 200, headers: {}, body: []}
    };

    /**
     * Constructs a created (201) response.
     */
    Response.created = function (uri) {
        return {status: 200, headers: {"Location": uri}, body: []}
    };

    /**
     * Constructs a plain html response.
     */
    Response.html = function (html, charset) {
        charset = charset || "utf-8";
        return {
            status: 200,
            headers: {"Content-Type": "text/html; charset=" + charset},
            body: [html.toByteString(charset)]
        }
    }
     
    /**
     * Dumps the data object as a JSON string.
     */
    Response.json = function (data) {
	    if (typeof data !== "string")
	        data = JSON.stringify(data);
        return {
            status: data.status || 200,
            headers: {"Content-Type": "application/json"},
            body: [data.toByteString("utf-8")]
        }
    }

    /**
     * Constructs a JSONP response.
     * http://en.wikipedia.org/wiki/JSON#JSONP
     */
    Response.jsonp = function (data, callback) {
	    if (typeof data !== "string")
	        data = JSON.stringify(data);
        return {
            status: data.status || 200,
            headers: {"Content-Type": "application/javascript"},
            body: [(callback + "(" + data + ")").toByteString("utf-8")]
        }
    }

    /**
     * Constructs a chunked response.
     * Useful for streaming/comet applications.
     */
    Response.chunked = function (func) {
        // FIXME: make this RingoJS compatible!
        return new Response(200, { "Transfer-Encoding": "chunked" }).finish(func);
    }

    /**
     * a 304 (Not modified) response.
     */
    Response.notModified = function () {
        return {status: 304, headers: {}, body: []};
    }

    /**
     * A 401 (Unauthorized) response.
     */
    Response.unauthorized = function (msg) {
        return {status: 401, headers: {}, body: [msg || "Unauthorized"]};
    }

    /**
     * A 404 (Not found) response.
     */
    Response.notFound = function (msg) {
        return {status: 404, headers: {}, body: [msg || "Not found"]};
    }   
} catch (e) {
    exports.Request = require("jack/request").Request;
}
