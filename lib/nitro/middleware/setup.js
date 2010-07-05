var ContentLength = require("jack/contentlength").ContentLength,
    ContentType = require("jack/contenttype").ContentType,
    MethodOverride = require("jack/methodoverride").MethodOverride,
    Head = require("jack/head").Head;

/**
 * Helper middleware that applies a standard pipeline of middleware.
 */    
exports.Setup = exports.middleware = function (app) {
    var upstream = ContentLength(ContentType(Head(MethodOverride(app))));

    return function (request) {
        return upstream(request);
    }
}
