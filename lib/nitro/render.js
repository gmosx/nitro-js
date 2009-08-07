/**
 * Render middleware. Evaluates the template that corresponds to PATH_INFO
 * with the JSON data returned from Dispatcher.
 *
 * Accepts a templating engine as an optional parameter. Uses the standard 
 * templating engine by default.
 */
exports.Render = function(app, template) {
    var loadTemplate = (template || require("nitro/template")).Template.load;

    // The request parameters are not used as template arguments by default, 
    // this is a major security risk!
    //
    // THINK: only render templates for GET requests (override if neccessary in
    // upstream)?
    return function(env) {
        var response = app(env);

        // FIXME: better test here.
        if ((typeof(response[2]) == "object") && (!Array.isArray(response[2])) && (response[1]["Transfer-Encoding"] != "chunked")) { 
        	var template = loadTemplate(env["PATH_INFO"]);
            if (template) {
                response[2] = [template.render(response[2])];
            }
        }

        return response;
    }
    
}
