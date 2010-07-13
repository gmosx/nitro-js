/** @fileoverview API middleware.*/

/**
 * Wrap an API response.
 */
var wrapApiResponse = exports.wrapApiResponse = function (response) {
    if (response.data) {
        response.headers = response.headers || {};
        response.headers["Content-Type"] = response.headers["Content-Type"] || "application/json";
//      response.headers["API-Version"] = "1.0";
//          response.body = [JSON.stringify(response.data).toByteString("UTF-8")];
        response.body = [JSON.stringify(response.data)];
        delete response.data;
    }
    
    return response;
}

/**
 * API middleware.
 *
 * This alternative to the Render middleware, implements a REST API that follows 
 * the design of GData 2.0:
 * http://code.google.com/apis/gdata/docs/2.0/reference.html
 * 
 * @param {Function} The upstream application.
 * @returns {Function} The wrapped JSGI app.
 */
exports.API = exports.middleware = function (app) {
    return function (request) {
        // TODO: redirect api.myapp.com -> www.myapp.com/api
        // no need to handle ?alt, json is returned by default.
   
        return wrapApiResponse(app(request));
    }
}


