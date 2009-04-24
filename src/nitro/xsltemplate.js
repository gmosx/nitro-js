var file = require("file");

var XSL = require("text/xslt").XSL,
    PlainTemplate = require("nitro/template").Template,
    FileCache = require("nitro/utils/filecache").FileCache;

var xslRoot = CONFIG.xslRoot || (CONFIG.pathPrefix+"src/app/");
var XSLPI_RE = new RegExp('<\?xml-stylesheet type="text/xsl" href="([^"]*)');

var cache = new FileCache(function(path) {
    return new XSL(path);
});

/**
 * An extension of the default template that pre-applies XSLT to the template
 * source.
 */
var Template = exports.Template = function(src, path) {
	try {
	    var match = src.match(XSLPI_RE);
	    if (match) {
	        // If the template includes an XSL processing instruction, 
	        // XSL transform the input.
	        var xslPath = xslRoot + match[1];       
	        var xsl = cache.get(xslPath);
	        src = xsl.transform(src, path);
	    }
	} catch (e) {
		print(e);
    }

    this.template = new PlainTemplate(src);
} 

Template.prototype.render = function(data) {
    return this.template.render(data);
}

