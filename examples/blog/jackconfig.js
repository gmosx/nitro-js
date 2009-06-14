require("oop");
require("nitro");

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

var Template = require("nitro/utils/xsltemplate").Template;

var Wrap = require("./src/wrap").Wrap,
    config = require("./src/config");

exports.app = ContentLength(Normalize(Cascade([
    File("root"), 
    Errors(Render(Wrap(Dispatch()), Template))
])));

exports.development = function(app) {
    require("hash").Hash.update(CONFIG, config.development);   
    Database.register(CONFIG.database);
    return app;
}
