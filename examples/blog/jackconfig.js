#!/usr/bin/env jackup

load("etc/config.js");

var Nitro = require("nitro");

var Database = require("database").Database;

var File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength, 
    Cascade = require("jack/cascade").Cascade,
    MethodOverride = require("jack/methodoverride").MethodOverride;
    
var Dispatch = require("nitro/middleware/dispatch").Dispatch,
    Normalize = require("nitro/middleware/normalize").Normalize,
    Render = require("nitro/middleware/render").Render,
    Errors = require("nitro/middleware/errors").Errors,
    SessionManager = require("nitro/middleware/sessionmanager").SessionManager;

var Setup = require("app/middleware/setup").Setup;

Database.register(CONFIG.database);

exports.app = ContentLength(Normalize(Cascade([
    File("root"), 
    SessionManager(Errors(Render(Setup(Dispatch()))), CONFIG.session.secret)
])));

