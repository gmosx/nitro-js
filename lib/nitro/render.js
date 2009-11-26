var templatemanager = require("nitro/templatemanager"),
    TemplateManager = templatemanager.TemplateManager;

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
exports.Render = function(app, templateManager) {
 
    if (!templateManager) {
        templateManager = new TemplateManager();
    }
    
    if (typeof(templateManager) == "string") {
        templatemanager.templatesRoot = templateManager;
        templateManager = new TemplateManager(templateManager);
    }
    
    return function(env) {
        env["nitro.template_manager"] = templateManager;
    
        var response = app(env);
        if (response.data) {
            var template = templateManager.load(response.data.TEMPLATE_PATH || env["PATH_INFO"]);
            if (template) {
                response.body = [template.render(response.data)];
            } /* else {
                response.body = [JSON.stringify(response.data)];
            } */
        }
    
        return response;
    }

}
