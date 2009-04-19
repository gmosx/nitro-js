var Nitro = require("nitro");

var Database = require("database").Database;

var File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength, 
    Cascade = require("jack/cascade").Cascade,
    MethodOverride = require("jack/methodoverride").MethodOverride;
    
var Dispatch = require("nitro/middleware/dispatch").Dispatch,
    Normalize = require("nitro/middleware/normalize").Normalize,
    Render = require("nitro/middleware/render").Render,
    Catch = require("nitro/middleware/catch").Catch,
    Errors = require("nitro/middleware/errors").Errors,
    SessionManager = require("nitro/middleware/sessionmanager").SessionManager;

var Setup = require("app/middleware/setup").Setup;

load("etc/config.js");

Database.register(CONFIG.database);

exports.app = ContentLength(Normalize(Cascade([
    File("root"), 
    SessionManager(Errors(Catch(Render(Setup(Dispatch())))), CONFIG.session.secret)
])));

