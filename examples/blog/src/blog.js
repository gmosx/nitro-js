#!/usr/bin/env narwhal

load("etc/config.js");

require.loader.setPaths(
    require.loader.getPaths().concat(["src", "lib", CONFIG.paths.nitro + "/src", CONFIG.paths.nitro + "/lib"])
);

require("nitro");

var Database = require("database").Database;

Database.register(CONFIG.database);

var CommonLogger = require("jack/commonlogger").CommonLogger,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint, 
    File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength, 
    Cascade = require("jack/cascade").Cascade,
    MethodOverride = require("jack/methodoverride").MethodOverride;
    
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
var app = MethodOverride(CommonLogger(ShowExceptions(Lint(ContentLength(Normalize(cascade))))));

var options = { port : 8080, host : "0.0.0.0" };

require("jack/handler/" + CONFIG.jack.handler).Handler.run(app, options);
