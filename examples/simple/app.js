#!/usr/bin/env nitro

var CommonLogger = require("jack/commonlogger").CommonLogger,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint, 
    File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength, 
    Cascade = require("jack/cascade").Cascade;
    
var Nitro = require("nitro").Nitro,
    Dispatch = require("nitro/middleware/dispatch").Dispatch,
    Normalize = require("nitro/middleware/normalize").Normalize,
    Render = require("nitro/middleware/render").Render,
    Catch = require("nitro/middleware/catch").Catch;

var app = CommonLogger(ShowExceptions(Lint(ContentLength(Normalize(
        Cascade([
            File("root"), 
            Catch(Render(Dispatch()))
        ])        
    )))));

Nitro.run(app);
