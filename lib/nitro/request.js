var Request = exports.Request = require("jack/request").Request;

/**
 * Return a Request object for this environment. Cache the request object for
 * reuse.
 */
exports.request = function(env) {
    if (!env.request) env.request = new Request(env);    
    return env.request;
}

