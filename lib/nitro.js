var fs = require("file");

// Global CONFIG object.
if (!global.CONFIG) global.CONFIG = {};

// The directory of the main module (typically jackconfig.js)
CONFIG.appRoot = fs.dirname(fs.canonical(system.args[0]));

require.paths.unshift(CONFIG.appRoot + "/src");

CONFIG.templateRoot = CONFIG.templateRoot || (CONFIG.appRoot + "/src/root");
