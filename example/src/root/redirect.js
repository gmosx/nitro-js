var Response = require("nitro/response").Response;

exports.GET = function (request) {
    return Response.redirect(request.headers.referer);
}
