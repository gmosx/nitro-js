/**
 * Render middleware.
 *
 * Inspects the headers of the upstream response. If the response includes a data object
 * it evaluates the template that corresponds to the given PATH_INFO and sets the
 * response body to the rendered template.
 *
 * Accepts a templating engine as an optional parameter. Uses the standard 
 * templating engine by default.
 */
exports.Render = function(app, template) {
 
    var loadTemplate = (template || require("nitro/template")).Template.load;
    
    return function(env) {
        var response = app(env);
        
        if (response.data) {
            var template = loadTemplate(env["PATH_INFO"]);
            if (template)
                response[2] = [template.render(response.data)];
        }
    
        return response;
    }

}
