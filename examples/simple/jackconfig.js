var File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength,
    Cascade = require("jack/cascade").Cascade;

exports.app = function(env) {
	return [200, {}, ["hello"]];
};

exports.development = function(app) {
	global.CONFIG = {
		srcPath: "src",
		templateRoot: "src/root"
	}
	
	require("nitro");
	
	var Dispatch = require("nitro/middleware/dispatch").Dispatch,
		Normalize = require("nitro/middleware/normalize").Normalize,
		Render = require("nitro/middleware/render").Render;

	return ContentLength(Normalize(Render(Dispatch())));
}

exports.debug = function(app) {
	global.CONFIG = {
		srcPath: "WEB-INF/src",
		templateRoot: "WEB-INF/src/root",
		reload: true
	}

	require("nitro");
	
    var Lint = require("jack/lint").Lint,
    	ShowExceptions = require("jack/showexceptions").ShowExceptions;
    	
	var Dispatch = require("nitro/middleware/dispatch").Dispatch,
		Normalize = require("nitro/middleware/normalize").Normalize,
		Render = require("nitro/middleware/render").Render;

	return ShowExceptions(Lint(ContentLength(Cascade([File("."), Normalize(Render(Dispatch()))]))));
}

exports.gae = function(app) {
	global.CONFIG = {
		srcPath: "WEB-INF/src",
		templateRoot: "WEB-INF/src/root"
	}

	require("nitro");
	
	var Dispatch = require("nitro/middleware/dispatch").Dispatch,
		Normalize = require("nitro/middleware/normalize").Normalize,
		Render = require("nitro/middleware/render").Render;
	
	return ContentLength(Normalize(Render(Dispatch())));
}
