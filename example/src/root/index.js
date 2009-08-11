var render = require("nitro/response").render;

exports.GET = function(env) {
    return render({
        time: new Date()
    });
}
