require("lang/object");

/**
 * Nitro provides a library of carefully designed middleware and utilities for 
 * creating scalable, standards-compliant Web Applications with JavaScript. 
 * Nitro is build on top of Jack, Narwhal/ServerJS and Rhino.
 */
var Nitro = exports.Nitro = {};

// Global CONFIG object.

if (!global.CONFIG) global.CONFIG = {};

// Setup js path.

var paths = require.loader.getPaths();

paths.unshift(CONFIG.srcPath || "src");
paths.unshift(CONFIG.libPath || "lib");

require.loader.setPaths(paths);
