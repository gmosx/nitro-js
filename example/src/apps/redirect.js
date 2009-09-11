var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

exports.GET = function(env) {
    var request = new Request(env);
    return Response.redirect(request.referer());
}
