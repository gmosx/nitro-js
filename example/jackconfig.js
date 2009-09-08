require("nitro");

var File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint,
    Cascade = require("jack/cascade").Cascade;

var Dispatch = require("nitro/dispatch").Dispatch,
    Path = require("nitro/path").Path,
    Render = require("nitro/render").Render,
    SessionManager = require("nitro/sessionmanager").SessionManager;

var Wrap = require("./src/wrap").Wrap;

exports.app = ShowExceptions(Lint(ContentLength(Path(SessionManager(Render(Wrap(Dispatch())), "s3cr3t")))));

// The default jackup environment is 'development'.
exports.development = function(app) {
    return require("jack/reloader").Reloader(module.id, "app");
}
