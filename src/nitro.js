require("lang/object");

/**
 * Nitro is a Web Application Framework. 
 * 
 * Nitro applications are implemented with JavaScript and leverage (strict) Web 
 * Standards like XHTML/HTML, CSS, HTTP, XML, XSLT, ECMAScript 3.0, 
 * MicroFormats, etc. Typically, Nitro applications are a collection of programs 
 * that run on the server *and* the client. A control program dispatches work 
 * to the application programs and aggregates their output. The application's 
 * output is consumed by modern web browsers, web services or other applications 
 * through a standard REST interface.
 */
var Nitro = exports.Nitro = {};

Nitro.VERSION = "0.0.7";

// Global CONFIG object.

if (!global.CONFIG) CONFIG = {};

// Setup js path.

var paths = require.loader.getPaths();

paths.unshift(CONFIG.srcPath || "src");
paths.unshift(CONFIG.libPath || "lib");

require.loader.setPaths(paths);
