var ContentLength = require("jack/contentlength").ContentLength,
    MethodOverride = require("jack/methodoverride").MethodOverride,
    Head = require("jack/head").Head;

/**
 * Helper middleware that applies a standard pipeline of middleware.
 */    
exports.Setup = exports.middleware = function (app) {
    var upstream = ContentLength(Head(MethodOverride(app)));

    return function (env) {
        return upstream(env);
    }
}
