// Associating Style Sheets with XML documents
// http://www.w3.org/TR/xml-stylesheet/

var JSTemplate = require("text/template/jst").Template,
    XSLT = require("text/xml/xslt").XSLT;

var FileCache = require("nitro/utils/filecache").FileCache;

var XSLPI_RE = new RegExp('<\?xml-stylesheet type="text/xsl" href="([^"]*)');

var cache = new FileCache(function(path) {
    var src = readFile(path);
    
    var match = XSLPI_RE.exec(src);
    
    if (match) {
        // If the template includes an XSL processing instruction, XSL transform
        // the input.
        var xslPath = "src/xsl/" + match[1];       
        src = XSLT.transform(src, readFile(xslPath));
    }

    return new JSTemplate(src);
});

/**
 * High level template manager.
 * At the moment performs XSLT transformation and JST interpolation.
 */
var Template = exports.Template = function(xslPath) {

};

Template.load = function(path) {
    return cache.get(path);
}

Template.render = function(path, args) {
    return Template.load(path).render(args);
}
