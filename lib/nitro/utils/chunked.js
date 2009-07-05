/**
 * Constructs a chunked response.
 * Useful for streaming/comet applications.
 */
exports.ChunkedResponse = function(func) {
    return [200, {"Transfer-Encoding": "chunked"}, {forEach: func}];
}

