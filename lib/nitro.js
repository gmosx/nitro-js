require("lang/object");

// Global CONFIG object.

if (!global.CONFIG) global.CONFIG = {};

/**
 * The framework initialization code is implemented as a middleware app.
 */
exports.Nitro = function(app) {
    // Setup js path.
    require.paths.unshift(CONFIG.srcPath || "src");
    require.paths.unshift(CONFIG.libPath || "lib");
    
    // Setup default configuration parameters.
    CONFIG.templateRoot = CONFIG.templateRoot || "src/root";

    return app;
}
