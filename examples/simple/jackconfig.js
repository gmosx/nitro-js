var File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint,
    Cascade = require("jack/cascade").Cascade;

var Nitro = require("nitro").Nitro,
	Dispatch = require("nitro/middleware/dispatch").Dispatch,
	Normalize = require("nitro/middleware/normalize").Normalize,
	Render = require("nitro/middleware/render").Render;

exports.app = ContentLength(Normalize(Render(Dispatch())));

// The default jackup environment is 'development'.
exports.development = function(app) {
	global.CONFIG = {
		srcPath: "src",
		templateRoot: "src/root"
	}
	
	return Nitro(ShowExceptions(Lint(app)));
}

// The default gae environment is 'gae'.
exports.gae = function(app) {
	global.CONFIG = {
		srcPath: "WEB-INF/src",
		templateRoot: "WEB-INF/src/root",
	}

	return Nitro(app);
}