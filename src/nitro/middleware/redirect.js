var Response = require("jack/response").Response;

/**
 * Catches redirect exceptions from upstream.
 */
var Redirect = exports.Redirect = function(app) {

    // TODO: ignore redirect sin XHR requests!
    return function(env) {
        try {
            return app(env);
        } catch (e) {
            if ("HttpRedirect" == e.exceptionType) {
                return new Response('Go to <a href="' + e.uri + '">' + e.uri + '</a>', e.status, { Location: e.uri }).finish(); 
            } else {
                throw e;
            }
        }    
    }

}
