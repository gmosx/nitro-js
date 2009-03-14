var Request = require("jack/request").Request,
    Response = require("jack/response").Response;

/**
 * Catches redirect exceptions from upstream. If no redirection URI is provided
 * the user is redirected to the request referrer.
 */
var Redirect = exports.Redirect = function(app) {

    // TODO: ignore redirect sin XHR requests!
    return function(env) {
        try {
            return app(env);
        } catch (e) {
            if ("HttpRedirect" == e.exceptionType) {
                if (!e.uri) 
                    e.uri = new Request(env).referer();
                return new Response('Go to <a href="' + e.uri + '">' + e.uri + '</a>', e.status, { Location: e.uri }).finish(); 
            } else {
                throw e;
            }
        }    
    }

}
