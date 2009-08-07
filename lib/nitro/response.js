var Response = exports.Response = require("jack/response").Response;

/**
 * Constructs an plain text response.
 */
exports.text = function(text) {
    return [200, {}, [text]];
}

/**
 * Constructs an HTTP Redirect response.
 */
var redirect = exports.redirect = function(location, status) {
    status = status || 303;
    return [
        status,
        {
            "Location": location,
            "Content-type": "text/plain"
        },
        ['Go to <a href="' + location + '">' + location + "</a>"]
    ];
}

/**
 * Constructs an HTTP Redirect to Referrer response.
 */
exports.redirectToReferer = exports.redirectToReferrer = function(env, status) {
    return redirect(env["HTTP_REFERER"], status);
}
 
/**
 * Dumps the data object as a JSON string.
 */
exports.json = function(data) {
    return [200, {"Content-Type": "application/json"}, [JSON.stringify(data)]];
}

/**
 * Constructs a JSONP response.
 * http://en.wikipedia.org/wiki/JSON#JSONP
 */
exports.jsonp = function(data, callback) {
	var response;
	if (typeof(data) == "string")
		response = callback + "(" + data + ");";
	else
		response = callback + "(" + JSON.stringify(data) + ");";
	return [200, {"Content-Type": "application/javascript"}, [response]];	
}

/**
 * Constructs a chunked response.
 * Useful for streaming/comet applications.
 */
exports.chunked = function(func) {
    return [200, {"Transfer-Encoding": "chunked"}, {forEach: func}];
}

/**
 *
 */
exports.movedPermanently = function(location) {
    return [301, {"Location": location}, ['Go to <a href="' + location + '">' + location + "</a>"]];
}

/**
 *
 */
exports.notModified = function() {
    return [304, {}, []];
}

/**
 *
 */
exports.notFound = function(msg) {
    return [404, {}, [msg || "Not found"]];
}
