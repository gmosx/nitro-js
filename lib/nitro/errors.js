var file = require("file"),
    HTTP_STATUS_CODES = require("jack/utils").HTTP_STATUS_CODES;

/**
 * Catches 4XX and 5XX errors from upstream. 
 * Renders the error using the provided template.
 */
exports.Errors = function(app, templatePath) {
    var template;

    return function(env) {
        var response;

        try {
            response = app(env);
        } catch (e) {
            var backtrace = String((e.rhinoException && e.rhinoException.printStackTrace()) || (e.name + ": " + e.message));
            var msg = e.rhinoException ? " : " + e.rhinoException.printStackTrace() : "";
            response = [500, {}, [e.toString() + msg]];
        }

        var status = parseInt(response[0]);

        if (status >= 400) {
            var data = {
                status: status,
                statusString: HTTP_STATUS_CODES[status],
                path: env["PATH_INFO"],
                error: response[2]
            }
            
            if (status >= 500)
                print("ERROR: " + data.error);
 
            if (!template) {
                template = require("nitro/utils/template").Template.load(templatePath || "/error.html");
                if (!template) {
                    // TODO: Debug warning.
                    template = new require("template").Template('<html>{content}</html');
                }
            }

            return [status, {}, [template.render(data)]];
        }

        return response;
    }
}
