require("lang/object");

var Hash = require("hash").Hash;

/**
 * Nitro helpers.
 */
var Nitro = exports.Nitro = {};

Nitro.VERSION = "0.0.5";

/**
 * Run an application.
 */
Nitro.run = function(app) {
    if (!__global__.CONFIG) CONFIG = {};
    
    var options = { handler: "simple", port: 8080, host: "0.0.0.0" };
    if (CONFIG.jack) options = Hash.merge(options, CONFIG.jack);
    
    require("jack/handler/" + options.handler).Handler.run(app, options);
}

