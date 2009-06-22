var file = require("file"),
    HTTP_STATUS_CODES = require("jack/utils").HTTP_STATUS_CODES;

var Template = require("template").Template;


/**
 * Catches 4XX and 5XX errors from upstream. 
 * Renders the error using the provided template.
 */
exports.Errors = function(app, templateFile) {
    
    var template;

    return function(env) {
        var response;

        try {
            response = app(env);
        } catch (e) {
            var backtrace = String((e.rhinoException && e.rhinoException.printStackTrace()) || (e.name + ": " + e.message));
            response = [500, {}, [e.toString() + " : " + backtrace]];
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
                var templatePath = CONFIG.templateRoot + "/" + (templateFile || "error.html");
                
                try {
                    var src = file.read(templatePath).toString();
                    template = new Template(src);
                } catch (e) {
                    throw "Error template '" + templatePath + "' not found!";
                }
            }

            return [status, {}, [template.render(data)]];
        }

        return response;
    }

}
