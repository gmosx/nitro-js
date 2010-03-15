var Response = exports.Response = require("jack/response").Response;

// Helpers for common responses:

/**
 * Constructs a success (200) response.
 */
Response.ok = function() {
    return {status: 200};
}

/**
 * Constructs a created (2001) response.
 */
Response.created = function(uri) {
    return {status: 200, body: [uri]};
}

/**
 * Constructs an plain html response.
 */
Response.html = function(html) {
    return {status: 200, headers: {"Content-Type": "text/html"}, body: [html]};
}
 
/**
 * Dumps the data object as a JSON string.
 */
Response.json = function(data, status) {
    return {status: status || 200, headers: {"Content-Type": "application/json"}, body: [JSON.stringify(data)]};
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
	return {status: data.status || 200, headers: {"Content-Type": "application/javascript"}, body: [response]};	
}

/**
 * Constructs a chunked response.
 * Useful for streaming/comet applications.
 */
Response.chunked = function(func) {
    return {status: 200, headers: {"Transfer-Encoding": "chunked"}, body: {forEach: func}};
}

/**
 * a 304 (Not modified) response.
 */
Response.notModified = function() {
    return {status: 304, headers: {}, body: []};
}

/**
 * A 404 (Not found) response.
 */
Response.notFound = function(msg) {
    return {status: 404, headers: {}, body: [msg || "Not found"]};
}

/**
 * A 401 (Unauthorized) response.
 */
Response.unauthorized = function(msg) {
    return {status: 401, headers: {}, body: [msg || "Unauthorized"]};
}

