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
            response = { status: 500, headers: {}, body: [e.toString() + msg] };
        }

        var status = parseInt(response.status);

        if (status >= 400) {
            var data = {
                status: status,
                statusString: HTTP_STATUS_CODES[status],
                path: env["PATH_INFO"],
                error: response[2]
            }
            
            if (status >= 500)
                print(data.error);
 
            if (!template) {
                template = require("nitro/template").Template.load(templatePath || "/error.html");
                if (!template) {
                    // TODO: Debug warning.
                    template = new require("template").Template("<html>{content}</html>");
                }
            }

            response.body = [template.render(data)];
        }

        return response;
    }
}
