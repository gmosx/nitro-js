var HashP = require("hashp").HashP;

var Response = require("nitro/response").Response,
    Template = require("nitro/template").Template;

/**
 * Render middleware.
 */
var Render = exports.Render = function(app, templateRoot) {

    templateRoot = templateRoot || "templates";

    // The request parameters are not used as template arguments by default, 
    // this is a major security risk!
    //
    // THINK: only render templates for GET requests (override if neccessary in
    // upstream)?
    return function(env) {
        var response = app(env);
        var data = HashP.unset(response[1], "X-Set-Data");
        
        if (response[0] == 404 || data) {
            // If no upstream app was found or if the upstream app has set
            // X-Set-Data attempt to render a temlate.
        
            var template;

            if (template = Template.load(templateRoot + env["PATH_INFO"])) {
                var body = template.render(data);
                response[2] = body;
                HashP.set(response[1], "Content-Length", body.length.toString(10));
            }
        }

        return response;
    }
    
}
