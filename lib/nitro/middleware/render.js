/**
 * Render middleware.
 *
 * Inspects the headers of the upstream response. If the response includes a data object
 * it evaluates the template that corresponds to the given PATH_INFO and sets the
 * response body to the rendered template.
 *
 * Options:
 *  templateEngine = the template engine to use (default: Normal Template)
 *  templateRoot = the root directory for templates
 */
exports.Render = function(app, options) {

    if (!options) options = {};

    var templateEngine = new (options.templateEngine || require("nitro/normaltemplate").NormalTemplateEngine)(options);

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
