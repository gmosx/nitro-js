var HTTP_STATUS_CODES = require("jack/utils").HTTP_STATUS_CODES;

/**
 * Catches 4XX and 5XX errors from upstream. 
 * Renders the error using the provided template.
 */
exports.Errors = function(app, templatePath) {

    templatePath = templatePath || "/error.html";

    return function(env) {
        var response;

        try {
            response = app(env);
        } catch (e) {
            var backtrace = String((e.rhinoException && e.rhinoException.printStackTrace()) || (e.name + ": " + e.message));
            var msg = e.rhinoException ? " : " + e.rhinoException.getScriptStackTrace() : "";
            response = {status: 500, headers: {}, body: [e.toString() + msg]};
        }

        var status = parseInt(response.status);

        if (status >= 400) {
            response.data = {
                status: status,
                statusString: HTTP_STATUS_CODES[status],
                path: env["nitro.original_path_info"],
                error: response.body.join("<br/>"),
                TEMPLATE_PATH: templatePath
            }

            var templateManager = env["nitro.template_manager"],
                template = templateManager.load(templatePath);
            
            if (template) {
                response.body = [template.render(response.data)];
            } else {
                response.body = [response.data.error];
                print("Error template not defined");
            }            

            if (status >= 400) print(response.data.error);
        }

        return response;
    }

}
