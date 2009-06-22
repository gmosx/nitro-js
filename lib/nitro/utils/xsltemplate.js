var XSL = require("./xslt").XSL,
    Template = require("template").Template;

CONFIG.xslPath = CONFIG.xslPath || "src/html.xsl";

var xsl,
    XML_RE = new RegExp("<\?xml", "i");

Template.filter = function(src) {
    if (!xsl) xsl = new XSL(CONFIG.xslPath);
    if (src.match(XML_RE)) {
        // Hack-fix for systemId.
        return xsl.transform(src, CONFIG.templateRoot + "/index.html");
    } else {
        return src;
    }
}

/**
 * An extension of the default template that pre-applies XSLT to the template
 * source by setting a custom Template.filter function.
 *
 * Please note that this affects the original Template 'class'. You get the
 * modified Template using require("template");
 */
exports.Template = Template;
