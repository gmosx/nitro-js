var Response = exports.Response = require("jack/response").Response;

/**
 * Constructs an plain text response.
 */
exports.textResponse = function(text) {
    return [200, {}, [text]];
}

/**
 * Constructs an HTTP Redirect response.
 */
exports.redirectResponse = function(location, status) {
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
 * Dumps the data object as a JSON string.
 */
exports.jsonResponse = function(data) {
    return [200, {"Content-Type": "application/json"}, [JSON.stringify(data)]];
}

/**
 * Constructs a JSONP response.
 * http://en.wikipedia.org/wiki/JSON#JSONP
 */
exports.jsonpResponse = function(data, callback) {
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
exports.chunkedResponse = function(func) {
    return [200, {"Transfer-Encoding": "chunked"}, {forEach: func}];
}

