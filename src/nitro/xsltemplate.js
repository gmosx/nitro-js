var File = require("file").File;

var XSLT = require("text/xslt").XSLT,
    PlainTemplate = require("nitro/template").Template;

var xslRoot = CONFIG.xslRoot || "src/app/";
var XSLPI_RE = new RegExp('<\?xml-stylesheet type="text/xsl" href="([^"]*)');

/**
 * An extension of the default template that pre-applies XSLT to the template
 * source.
 */
var Template = exports.Template = function(src, path) {
    var match = src.match(XSLPI_RE);
    if (match) {
        // If the template includes an XSL processing instruction, XSL transform
        // the input.
        var xslPath = xslRoot + match[1];       
        // FIXME: transformFile is used to correctly set base dir for x:include
        src = XSLT.transformFile(path, xslPath);
    }

    this.template = new PlainTemplate(src);
} 

Template.prototype.render = function(data) {
    return this.template.render(data);
}

