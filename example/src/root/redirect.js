var redirect = require("nitro/response").redirect;

exports.GET = function(env) {
    return redirect(env.request.referer());
}
