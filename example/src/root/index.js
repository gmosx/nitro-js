var Session = require("nitro/session").Session;

exports.GET = function (env) {
    var session = new Session(env);

    var counter = session.counter || 0;
    counter += 1;
    session.counter = counter;
 
    return {data: {
        time: new Date(),
        counter: counter
    }};
}
