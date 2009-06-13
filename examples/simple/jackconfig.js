var nitro = require("nitro");

var File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint,
    Cascade = require("jack/cascade").Cascade;

var Dispatch = require("nitro/middleware/dispatch").Dispatch,
	Normalize = require("nitro/middleware/normalize").Normalize,
	Render = require("nitro/middleware/render").Render;

var Wrap = require("./src/wrap").Wrap;

exports.app = ContentLength(Normalize(Render(Wrap(Dispatch()))));

// The default jackup environment is 'development'.
exports.development = function(app) {
 	return ShowExceptions(Lint(app));
}

// The default gae environment is 'gae'.
exports.gae = function(app) {
	return app;
}
