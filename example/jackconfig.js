var File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint,
    Cascade = require("jack/cascade").Cascade,
    CookieSessions = require("jack/session/cookie").Cookie;

var Dispatch = require("nitro/dispatch").Dispatch,
    Path = require("nitro/path").Path,
    Render = require("nitro/render").Render;

var Wrap = require("./src/wrap").Wrap;

// The application.
exports.app = ShowExceptions(Lint(ContentLength(Path(CookieSessions(Render(Wrap(Dispatch({dispatchRoot: "src/root"}), {templateRoot: "src/templates"})), {secret: "s3cr3t"})))));

// The default jackup environment is 'development'.
exports.development = function(app) {
    return require("jack/reloader").Reloader(module.id, "app");
}
