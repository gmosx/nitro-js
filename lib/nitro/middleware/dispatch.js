var FS = require("fs");

var Request = require("nitro/request").Request;

/**
 * A middleware that selects an app from the root tree.
 * In essence it acts like a Unix shell (or like PHP ;-))
 * This is the *right thing* to do!
 *
 * Options:
 *  dispatchRoot: the root directory for 'apps'.
 */
var Dispatch = exports.Dispatch = exports.middleware = function (options) {

    if (!options) options = {};

    var root = FS.canonical(options.dispatchRoot || "src/root");

    var dispatch = function (request) {
    	try {
            var script = require(root + request.scriptName);
        } catch (e) {
            if (FS.exists(root + request.scriptName + ".js")) {
                throw e;
            } else {
                return {status: 404, headers: {}, body: ["Action not found", e.toString()]};
            }
        }

        var app = getApp(script, request.method);

	    if (app) {
	        var response = app(request);
	        return response ? setDefaults(response) : {status: 200, headers: {}, body: [], data: {}};
	    } else {
            return {status: 405, headers: {}, body: ["'" + request.scriptName + "' does not respond to HTTP method '" + request.method + "'"]};
        }
    }

    return function (request) {
        new Request(request);
        request.dispatch = dispatch;
        return dispatch(request);
    }
    
}

var getApp = function (script, method) {
    if ((method == "HEAD") && (!script[method])) {
        // If the script has no HEAD app use the GET app.
        return script.GET;
    }
    
    return script[method];
}

var setDefaults = function (response) {
    if (!response.status) response.status = 200;
    if (!response.headers) response.headers = {};
    if (!response.body) response.body = [];

    return response;
}
