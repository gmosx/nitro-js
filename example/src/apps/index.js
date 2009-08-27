var Session = require("nitro/session").Session;

var render = require("nitro/response").render;

exports.GET = function(env) {
    var session = new Session(env);

    var counter = session.get("counter") || 0;
    counter += 1;
    session.put("counter", counter);
 
    return render({
        time: new Date(),
        counter: counter
    });
}
