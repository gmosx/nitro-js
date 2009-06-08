var File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint,
    Cascade = require("jack/cascade").Cascade;

exports.app = function() {};

exports.development = function(app) {
	global.CONFIG = {
		srcPath: "src",
		templateRoot: "src/root"
	}
	
	require("nitro");
	
	var Dispatch = require("nitro/middleware/dispatch").Dispatch,
		Normalize = require("nitro/middleware/normalize").Normalize,
		Render = require("nitro/middleware/render").Render;

	return ShowExceptions(Lint(ContentLength(Normalize(Render(Dispatch())))));
}

exports.gae = function(app) {
	global.CONFIG = {
		srcPath: "WEB-INF/src",
		templateRoot: "WEB-INF/src/root",
		xslRoot: "WEB-INF/src/app"
	}

	require("nitro");
	
	var Dispatch = require("nitro/middleware/dispatch").Dispatch,
		Normalize = require("nitro/middleware/normalize").Normalize,
		Render = require("nitro/middleware/render").Render;
	
	return ContentLength(Normalize(Render(Dispatch())));
}
