var Response = exports.Response = require("jack/response").Response;

// Helpers for common responses:

/**
 * Constructs an plain text response.
 */
Response.text = function(text) {
    return {status: 200, headers: {}, body: [text]};
}
 
/**
 * Dumps the data object as a JSON string.
 */
Response.json = function(data) {
    return {status: 200, headers: {"Content-Type": "application/json"}, body: [JSON.stringify(data)]};
}

/**
 * Constructs a JSONP response.
 * http://en.wikipedia.org/wiki/JSON#JSONP
 */
Response.jsonp = function(data, callback) {
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
Response.chunked = function(func) {
    return {status: 200, headers: {"Transfer-Encoding": "chunked"}, body: {forEach: func}};
}

/**
 *
 */
Response.notModified = function() {
    return {status: 304, headers: {}, body: []};
}

/**
 *
 */
Response.notFound = function(msg) {
    return {status: 404, headers: {}, body: [msg || "Not found"]};
}
