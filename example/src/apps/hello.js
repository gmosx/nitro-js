var text = require("nitro/response").text;

exports.GET = function(env) {
    return text("Hello World");
}
