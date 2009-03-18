var HashP = require("hashp").HashP;

var Template = require("nitro/utils/template").Template;

/**
 * Render middleware.
 */
exports.Render = function(app, templateRoot) {

    templateRoot = templateRoot || "src/root";

    // The request parameters are not used as template arguments by default, 
    // this is a major security risk!
    //
    // THINK: only render templates for GET requests (override if neccessary in
    // upstream)?
    return function(request, response) {
        app(request, response);
        
        var env = request.env;
        var data = response.unsetHeader("X-Set-Data");

        if (response.status == 404 || data) {
            // If no upstream app was found or if the upstream app has set
            // X-Set-Data attempt to render a temlate.
        
            var template;
            var templatePath = templateRoot + (env["TEMPLATE_PATH"] || env["PATH_INFO"]);

            if (template = Template.load(templatePath)) {
                var body = template.render(data);
                response.write(body);
            } 
        }
    }
    
}
