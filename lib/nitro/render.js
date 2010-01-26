/**
 * Render middleware.
 *
 * Inspects the headers of the upstream response. If the response includes a data object
 * it evaluates the template that corresponds to the given PATH_INFO and sets the
 * response body to the rendered template.
 *
 * You can pass the template engine to be used for rendering the data object.
 */
exports.Render = function(app, templateEngine) {

    if (!templateEngine) {
        NormalTemplateEngine = require("nitro/normaltemplate").NormalTemplateEngine; 
        templateEngine = new NormalTemplateEngine();
    }
 
    var render = function(templatePath, data) {
        var template = templateEngine.get(templatePath);
        return template(data);
    }
    
    return function(env) {
        env.render = render;
    
        var response = app(env);

        if (response.data) {
            var templatePath = response.data.TEMPLATE_PATH || env["PATH_INFO"];
            response.body = [render(templatePath, response.data)];
        }

        return response;
    }

}
