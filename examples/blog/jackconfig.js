require("oop");
require("nitro");

var Database = require("database").Database;

var File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength, 
    Cascade = require("jack/cascade").Cascade,
    MethodOverride = require("jack/methodoverride").MethodOverride;
    
var Dispatch = require("nitro/dispatch").Dispatch,
    Normalize = require("nitro/normalize").Normalize,
    Render = require("nitro/render").Render,
    Errors = require("nitro/errors").Errors,
    SessionManager = require("nitro/sessionmanager").SessionManager;

var Template = require("nitro/utils/xsltemplate").Template;

var Wrap = require("./src/wrap").Wrap,
    config = require("./src/config");

exports.app = ContentLength(Normalize(Cascade([
    File("root"), 
    Errors(Render(Wrap(Dispatch())))
])));

exports.development = function(app) {
    require("hash").Hash.update(CONFIG, config.development);   
    Database.register(CONFIG.database);
    return app;
}
