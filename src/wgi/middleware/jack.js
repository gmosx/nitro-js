var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

/**
 * Plug a wgi middleware pipeline into a jack pipeline.
 */
exports.JackAdapter = function(app) {

    return function(env) {
        var request = new Request(env);
        var response = new Response();
        app(request, response);
        return response.finish();
    }

}

