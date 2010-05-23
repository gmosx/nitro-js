/**
 * Render middleware.
 *
 * Inspects the headers of the upstream response. If the response includes a data object
 * it evaluates the template that corresponds to the given path info and sets the
 * response body to the rendered template.
 *
 * Options:
 *  templateEngine = the template engine to use (default: the included Normal Template engine)
 *  templateRoot = the root directory for templates
 */
exports.Render = exports.middleware = function (app, options) {
    if (!options) options = {};

    var templateEngine = new (options.templateEngine || require("nitro/template").TemplateEngine)(options);

    var render = function (templatePath, data) {
        if (options.cacheTemplates) {
            return templateEngine.get(templatePath)(data);        
        } else {
            return templateEngine.compileTemplate(templatePath)(data);
        }
    }
    
    return function (env) {
        env.render = render;
    
        var response = app(env);

        if (response.data) {
            var templatePath = response.data.TEMPLATE_PATH || env.scriptName + "." + env.pathTranslated.split(".").pop();
            response.body = [render(templatePath, response.data)];
        }

        return response;
    }
}
