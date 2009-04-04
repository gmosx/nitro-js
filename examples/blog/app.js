#!/usr/bin/env nitro

var Database = require("database").Database;

var CommonLogger = require("jack/commonlogger").CommonLogger,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint, 
    File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength, 
    Cascade = require("jack/cascade").Cascade,
    MethodOverride = require("jack/methodoverride").MethodOverride;
    
var Nitro = require("nitro").Nitro,
    Dispatch = require("nitro/middleware/dispatch").Dispatch,
    Normalize = require("nitro/middleware/normalize").Normalize,
    Render = require("nitro/middleware/render").Render,
    Catch = require("nitro/middleware/catch").Catch,
    SessionManager = require("nitro/middleware/sessionmanager").SessionManager;

var Setup = require("blog/middleware/setup").Setup;

load("etc/config.js");

Database.register(CONFIG.database);

var cascade = Cascade([
        File("root"), 
        SessionManager(Catch(Render(Setup(Dispatch()))), CONFIG.session.secret)
    ]);
var app = MethodOverride(CommonLogger(ShowExceptions(Lint(ContentLength(Normalize(cascade))))));

Nitro.run(app);
