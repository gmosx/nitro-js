var text = require("nitro/response").textResponse;

exports.GET = function(env) {
    return text("Hello World");
}
