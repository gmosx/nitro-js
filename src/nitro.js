require("lang/object");

// Global CONFIG object.

if (!global.CONFIG) global.CONFIG = {};

// Setup js path.

require.paths.unshift(CONFIG.srcPath || "src");
require.paths.unshift(CONFIG.libPath || "lib");
