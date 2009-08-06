var redirect = require("nitro/response").redirectResponse;

exports.GET = function(env) {
    return redirect(env.request.referer());
}
