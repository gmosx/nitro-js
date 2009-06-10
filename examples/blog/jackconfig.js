load("etc/config.js");

var nitro = require("nitro");

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

var Template = require("nitro/xsltemplate").Template;

var Setup = require("app/middleware/setup").Setup;

Database.register(CONFIG.database);

exports.app = ContentLength(Normalize(Cascade([
    File("root"), 
    Errors(Render(Setup(Dispatch()), Template))
])));

exports.development = function(app) {
    return(app);
}

