var Hash = require("hash"),
    Utils = require("jack/utils");

var Response = require("nitro/response").Response,
    Template = require("nitro/utils/template").Template;

/**
 * Catches 4XX and 5XX errors from upstream. 
 * Renders the error using the provided template.
 */
exports.Errors = function(app, templatePath) {

    var template = Template.load(templatePath || "src/root/error.html");

    return function(env) {
        var response;

        try {
            response = app(env);
        } catch (e) {
            // TODO: show backtrace!
            // var backtrace = String((e.rhinoException && e.rhinoException.printStackTrace()) || (e.name + ": " + e.message));
            response = [500, {}, e.toString()];
        }

        var status = parseInt(response[0]);

        if (status >= 400) {
            var data = {
                status: status,
                statusString: Utils.HTTP_STATUS_CODES[status],
                path: env["PATH_INFO"],
                error: response[2]
            }
            
            if (status >= 500)
                print("ERROR: " + data.error);
            
            return new Response(status, {}, template.render(data)).finish();
        }

        return response;
    }

}
