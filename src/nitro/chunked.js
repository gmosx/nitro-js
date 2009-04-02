/**
 * Constructs a chunked response.
 * Useful for streaming/comet applications.
 */
var Chunked = exports.Chunked = function(func) {
    return [200, {"Transfer-Encoding": "chunked"}, {forEach: func}];
}

