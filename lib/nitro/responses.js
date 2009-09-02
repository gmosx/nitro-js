/**
 * Helpers for common responses.
 */

/**
 * Constructs an plain text response.
 */
exports.text = function(text) {
    return {status: 200, headers: {}, body: [text]};
}

/**
 * Constructs an HTTP Redirect response.
 */
var redirect = exports.redirect = function(location, status) {
    status = status || 303;
    return { status: status || 303, headers: {
        "Location": location,
        "Content-type": "text/plain"
    }, body: ['Go to <a href="' + location + '">' + location + "</a>"]};
}
 
/**
 * Dumps the data object as a JSON string.
 */
exports.json = function(data) {
    return {status: 200, headers: {"Content-Type": "application/json"}, body: [JSON.stringify(data)]};
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
	return {status: 200, headers: {"Content-Type": "application/javascript"}, body: [response]};	
}

/**
 * Constructs a chunked response.
 * Useful for streaming/comet applications.
 */
exports.chunked = function(func) {
    return {status: 200, headers: {"Transfer-Encoding": "chunked"}, body: {forEach: func}};
}

/**
 *
 */
exports.notModified = function() {
    return {status: 304, headers: {}, body: []};
}

/**
 *
 */
exports.notFound = function(msg) {
    return {status: 404, headers: {}, body: [msg || "Not found"]};
}
