require("nitro");

var File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint,
    Cascade = require("jack/cascade").Cascade;

var Dispatch = require("nitro/dispatch").Dispatch,
	Normalize = require("nitro/normalize").Normalize,
	Render = require("nitro/render").Render;

var Wrap = require("./src/wrap").Wrap;

exports.app = ContentLength(Normalize(Render(Wrap(Dispatch()))));

// The default jackup environment is 'development'.
exports.development = function(app) {
 	return ShowExceptions(Lint(app));
}

// The default gae environment is 'gae'.
exports.gae = function(app) {
    CONFIG.root = "WEB-INF/src/root";
    CONFIG.templateRoot = "WEB-INF/src/templates";
	return app;
}
