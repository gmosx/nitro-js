#!/usr/bin/java org.mozilla.javascript.tools.shell.Main

// Run this script to start the example application. You may need to change the
// 'shebang' line at the top of this file.

$DEBUG = true;

// Set the correct path to jack/lib
$LOAD_PATH = "scripts:src:lib:../src:../lib:/home/gmosx/u/jack/lib"; 

load("core.js");

var CommonLogger = require("jack/commonlogger").CommonLogger,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint, 
    File = require("jack/file").File, 
    Cascade = require("jack/cascade").Cascade;

var Dispatch = require("nitro/middleware/dispatch").Dispatch,
    Normalize = require("nitro/middleware/normalize").Normalize,
    Render = require("nitro/middleware/render").Render,
    Redirect = require("nitro/middleware/redirect").Redirect;
    
try {

    var cascade = Cascade([File("www"), Lint(Redirect(Render(Dispatch())))]);
    var app = CommonLogger(ShowExceptions(Normalize(cascade)));
    
    var options = { port : 8080, host : "0.0.0.0" };

    // Use the SimpleFramework jack handler. You can require another handler if
    // you want, so suit yourself ;-)
    require("jack/handler/simple").Handler.run(app, options);
} catch (e) {
    print(e.message);
}

