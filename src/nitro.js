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

Nitro.VERSION = "0.0.9";

// Global CONFIG object.

if (!global.CONFIG) global.CONFIG = {};

// FIXME: HACK, detect GAE environment and set the pathPrefix accordingly.
CONFIG.pathPrefix = system.prefix.match("WEB-INF") ? "WEB-INF/" : "";

// Setup js path.

var paths = require.loader.getPaths();

paths.unshift(CONFIG.srcPath || (CONFIG.pathPrefix+"src"));
paths.unshift(CONFIG.libPath || (CONFIG.pathPrefix+"lib"));

require.loader.setPaths(paths);
