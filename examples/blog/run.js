#!/usr/bin/java org.mozilla.javascript.tools.shell.Main

// Run this script to start the example application. You may need to change the
// 'shebang' line at the top of this file.

load("etc/config.js");
$LOAD_PATH = "src:lib:" + CONFIG.paths.nitro + "/src:" + CONFIG.paths.nitro + "/lib:" + CONFIG.paths.jack + "/lib"; 
load(CONFIG.paths.jack + "/core.js");

try {
    require("lang/object");

    var Database = require("database").Database;
    Database.register(CONFIG.database);

    var CommonLogger = require("jack/commonlogger").CommonLogger,
        ShowExceptions = require("jack/showexceptions").ShowExceptions,
        Lint = require("jack/lint").Lint, 
        File = require("jack/file").File, 
        ContentLength = require("jack/contentlength").ContentLength, 
        Cascade = require("jack/cascade").Cascade;

    var Dispatch = require("nitro/middleware/dispatch").Dispatch,
        Normalize = require("nitro/middleware/normalize").Normalize,
        Render = require("nitro/middleware/render").Render,
        Catch = require("nitro/middleware/catch").Catch,
        SessionManager = require("nitro/middleware/sessionmanager").SessionManager;

    var Setup = require("blog/middleware/setup").Setup;
    
    var cascade = Cascade([
            File("root"), 
            SessionManager(Catch(Render(Setup(Dispatch()))), CONFIG.session.secret)
        ]);
    var app = CommonLogger(ShowExceptions(Lint(ContentLength(Normalize(cascade)))));
    
    var options = { port : 8080, host : "0.0.0.0" };

    require("jack/handler/" + CONFIG.jack.handler).Handler.run(app, options);
} catch (e) {
    print(e);
}

