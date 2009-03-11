#!/usr/bin/java org.mozilla.javascript.tools.shell.Main

// Run this script to start the example application. You may need to change the
// 'shebang' line at the top of this file.

$DEBUG = true;

// Set the correct path to jack/lib
$LOAD_PATH = "scripts:src:lib:/home/gmosx/u/nitro/src:/home/gmosx/u/nitro/lib:/home/gmosx/u/jack/lib"; 

load("src/core.js");

require("lang/object");

var CommonLogger = require("jack/commonlogger").CommonLogger,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint, 
    File = require("jack/file").File, 
    Cascade = require("jack/cascade").Cascade;

var Dispatch = require("nitro/middleware/dispatch").Dispatch,
    Normalize = require("nitro/middleware/normalize").Normalize,
    Render = require("nitro/middleware/render").Render,
    Redirect = require("nitro/middleware/redirect").Redirect,
    SessionManager = require("nitro/middleware/sessionmanager").SessionManager;

var Database = require("database/rdb").Database;
Database.setAdapter("com.mysql.jdbc.Driver");
$db = new Database("mysql://localhost/blog?user=nitro&password=p@ssw0rd");

try {

    var cascade = Cascade([File("root"), Lint(SessionManager(Redirect(Render(Dispatch())), "mys3cr3t"))]);
    var app = CommonLogger(ShowExceptions(Normalize(cascade)));
    
    var options = { port : 8080, host : "0.0.0.0" };

    // Use the SimpleFramework jack handler. You can require another handler if
    // you want, so suit yourself ;-)
    require("jack/handler/simple").Handler.run(app, options);
} catch (e) {
    print(e);
}

