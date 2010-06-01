var Setup = require("nitro/middleware/setup").Setup,
    Path = require("nitro/middleware/path").Path,
    Errors = require("nitro/middleware/errors").Errors,
    Render = require("nitro/middleware/render").Render,
    Dispatch = require("nitro/middleware/dispatch").Dispatch;

var Wrap = require("./src/wrap").Wrap;

exports.static = ["./root"];

exports.app = Setup(Path(Errors(Render(Wrap(Dispatch({dispatchRoot: "src/root"})), {templateRoot: "src/templates"})), {scriptRoot: "src/root"}));

if (require.main == module) {
    require("ringo/webapp").main(module.directory);
}
