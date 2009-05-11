require("lang/object");

// Global CONFIG object.

if (!global.CONFIG) global.CONFIG = {};

// Setup js path.

var paths = require.loader.getPaths();
paths.unshift(CONFIG.srcPath || "src");
require.loader.setPaths(paths);