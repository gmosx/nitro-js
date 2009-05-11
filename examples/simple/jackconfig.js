require("nitro");

var File = require("jack/file").File, 
    ContentLength = require("jack/contentlength").ContentLength,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint,
    Cascade = require("jack/cascade").Cascade;

var Dispatch = require("nitro/middleware/dispatch").Dispatch,
	Normalize = require("nitro/middleware/normalize").Normalize,
	Render = require("nitro/middleware/render").Render;

exports.app = ShowExceptions(Lint(ContentLength(
    Cascade([
        File("root"), 
        Normalize(Render(Dispatch()))
    ])
)));

