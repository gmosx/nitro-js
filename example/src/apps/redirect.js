var Response = require("jack/response").Response;

exports.GET = function(env) {
    return Response.redirect(env.request.referer());
}
