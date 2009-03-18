/**
 * Catches redirect exceptions from upstream. If no redirection URI is provided
 * the user is redirected to the request referrer.
 */
exports.Redirect = function(app) {

    // TODO: ignore redirect in XHR requests!
    return function(request, response) {
        try {
            app(request, response);
        } catch (e) {
            if ("HttpRedirect" == e.exceptionType) {
                if (!e.uri) 
                    e.uri = request.referer();

                response.status = e.status;
                response.write('Go to <a href="' + e.uri + '">' + e.uri + '</a>');
                response.setHeader("Location", e.uri); 
            } else {
                throw e;
            }
        }    
    }

}
