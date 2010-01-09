var TEMPLATING = require("nitro/templating");
//    loadTemplate = TEMPLATING.load;
    
/*
var templatemanager = require("nitro/templatemanager"),
    TemplateManager = templatemanager.TemplateManager;
*/

/**
 * Render middleware.
 *
 * Inspects the headers of the upstream response. If the response includes a data object
 * it evaluates the template that corresponds to the given PATH_INFO and sets the
 * response body to the rendered template.
 */
exports.Render = function(app, templatesRoot) {
/* 
    if (!templateManager) {
        templateManager = new TemplateManager();
    }
    
    if (typeof(templateManager) == "string") {
        templatemanager.templatesRoot = templateManager;
        templateManager = new TemplateManager(templateManager);
    }
*/
    TEMPLATING.templatesRoot = templatesRoot || "src/templates";
    
    var render = function(templatePath, data) {
        var template = TEMPLATING.get(templatePath);
        return template(data);
/*    
        var template = templateManager.load(templatePath);
        if (template) return template.render(data);
*/       
    }
    
    return function(env) {
//        env["nitro.template_manager"] = templateManager; // FIXME: remove!
        env.render = render;
    
        var response = app(env);

        if (response.data) {
            var templatePath = response.data.TEMPLATE_PATH || env["PATH_INFO"];
            response.body = [render(templatePath, response.data)];
        }

        return response;
    }

}
