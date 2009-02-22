var Response = require("jack/response").Response;

var Template = require("nitro/template").Template;

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
        var ret = app(env);
    
        if ("string" === typeof(ret)) {
            // Write the upstream output to the response and finish the response.
            return new Response(ret).finish();
        } else if ("object" === typeof(ret)) {
            if (Array === ret.constructor) {
                // Just return the upstream response.
                return ret;
            } else {
                // Use the upstream arguments to render a template.
                var template;
                
                if (template = Template.load(templateRoot + env["PATH_INFO"])) {
                    return new Response(template.render(ret)).finish();
                } else {
                    // THINK: what to do here?
                }
            }
        } else {
            throw "Render middleware: Invalid upstream response";
        }
    }
    
}
