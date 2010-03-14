var HTTP_STATUS_CODES = require("jack/utils").HTTP_STATUS_CODES;

/**
 * Catches 4XX and 5XX errors from upstream. 
 * Renders the error using the provided template.
 */
exports.Errors = function(app, options) {

    if (!options) options = {};

    var templatePath = options.errorTemplate || "/error.html";

    return function(env) {
        var response;

        try {
            response = app(env);
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
                path: env["nitro.original_path_info"],
                error: response.body.join("<br/>"),
                trace: response.trace
            }

            if (status >= 500) print(response.body.join("\n"));

            try {
                response.body = [env.render(templatePath, response.data)];
            } catch (e) {
                response.body = [response.data.error];
            }
        }

        return response;
    }

}
