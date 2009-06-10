require("lang/object");

var file = require("file");

// Global CONFIG object.
if (!global.CONFIG) global.CONFIG = {};

// The directory of the main module (typically jackconfig.js)
CONFIG.appRoot = global.APP_HOME || file.dirname(file.canonical(system.args[0] || "jackconfig"));

require.paths.unshift(CONFIG.appRoot + "/src");
