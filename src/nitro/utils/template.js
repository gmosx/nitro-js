// Associating Style Sheets with XML documents
// http://www.w3.org/TR/xml-stylesheet/

var JSTemplate = require("text/template/jst").Template,
    XSLT = require("text/xml/xslt").XSLT;

var FileCache = require("nitro/utils/filecache").FileCache;

var XSLPI_RE = new RegExp('<\?xml-stylesheet type="text/xsl" href="([^"]*)');

var xslRoot = CONFIG.xslRoot || "src/app/";

var loadTemplate = function(path) {
    try {
        var src = readFile(path);
        
        var match = XSLPI_RE.exec(src);
        
        if (match) {
            // If the template includes an XSL processing instruction, XSL transform
            // the input.
            var xslPath = xslRoot + match[1];       
            src = XSLT.transformFile(path, xslPath);
        }

        return new JSTemplate(src);
    } catch (e) {
        return null;
    }
}

var cache = new FileCache(loadTemplate);

/**
 * High level template manager.
 * At the moment performs XSLT transformation and JST interpolation.
 */
var Template = exports.Template = function(xslPath) {

};

Template.load = function(path) {
    if ($DEBUG)
        return loadTemplate(path);
    else
        return cache.get(path);
}

Template.render = function(path, args) {
    return Template.load(path).render(args);
}
