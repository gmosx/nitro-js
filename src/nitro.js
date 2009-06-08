require("lang/object");

// Global CONFIG object.

if (!global.CONFIG) global.CONFIG = {};

/**
 * The framework initialization code is implemented as a middleware.
 */
exports.Nitro = function(app) {
    // Setup js path.
    
    require.paths.unshift(CONFIG.srcPath || "src");
    require.paths.unshift(CONFIG.libPath || "lib");

    return app;
}
