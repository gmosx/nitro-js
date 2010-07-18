// -- gmosx George Moschovitis Copyright (C) 2009-2010 MIT License

var Request = require("nitro/request").Request;

/**
 * Provides Rails-style HTTP method overriding via the _method parameter or X-HTTP-METHOD-OVERRIDE header
 * http://code.google.com/apis/gdata/docs/2.0/basics.html#UpdatingEntry
 */
exports.MethodOverride = exports.middleware = function (app) {
    return function (env) {
        // FIXME: what happend when no "content-type"?
        if ((env.method == "POST") && (!(env.headers["content-type"] && env.headers["content-type"].match(/^multipart\/form-data/)))) {
            var request = new Request(env),
                // THINK: only check header to make more lightweight?
                method = env.headers[METHOD_OVERRIDE_HEADER] || request.params[METHOD_OVERRIDE_PARAM_KEY];
            if (method && METHODS[method.toUpperCase()] === true) {
                env["jack.methodoverride.original_method"] = env.requestMethod;
                env.method = method.toUpperCase();
            }
        }
        return app(env);
    }
}

var METHODS = {"GET": true, "HEAD": true, "PUT": true, "POST": true, "DELETE": true, "OPTIONS": true};
var METHOD_OVERRIDE_PARAM_KEY = "_method";
//var METHOD_OVERRIDE_HEADER = "X_HTTP_METHOD_OVERRIDE";
var METHOD_OVERRIDE_HEADER = "x-http-method-override";
