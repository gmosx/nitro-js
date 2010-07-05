var HTTP_STATUS_CODES = require("jack/utils").HTTP_STATUS_CODES;

/**
 * Catches 4XX and 5XX errors from upstream. 
 * Renders the error using the provided template.
 */
exports.Errors = exports.middleware = function (app, options) {

    if (!options) options = {};

    var notFoundTemplatePath = options.notFoundTemplatePath || "/notfound.html",
        errorTemplatePath = options.errorTemplatePath || "/error.html";

    return function (request) {
        var response;

        try {
            response = app(request);
        } catch (e) {
            var backtrace = String((e.rhinoException && e.rhinoException.printStackTrace()) || (e.name + ": " + e.message));
            var msg = e.rhinoException ? " : " + e.rhinoException.getScriptStackTrace() : "";
            response = {status: 500, headers: {}, body: [e.toString() + msg], trace: e.rhinoException ? e.rhinoException.getScriptStackTrace() : "" };
        }

        var status = parseInt(response.status, 10);

        if (status >= 400) {
            response.data = {
                status: status,
                statusString: HTTP_STATUS_CODES[status],
                path: request.pathTranslated,
                error: response.body.join("<br/>"),
                trace: response.trace
            }

            if (status >= 500) print(response.body.join("\n"));

            try {
                if (status < 500) {
                    try {
                        response.body = [request.render(notFoundTemplatePath, response.data)];
                    } catch (e) {
                        response.body = [request.render(errorTemplatePath, response.data)];
                    }
                } else {
                    response.body = [request.render(errorTemplatePath, response.data)];
                }
            } catch (e) {
                response.body = [response.data.error];
            }
        }

        return response;
    }

}
