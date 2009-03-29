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
    return function(env) {
        var response = app(env);
        
        if (typeof(response[2]) != "string") {
            var template;
            var templatePath = templateRoot + (env["TEMPLATE_PATH"] || env["PATH_INFO"]);

            if (template = Template.load(templatePath))
                response[2] = template.render(response[2]);
        }
        
        return response;
    }
    
}
