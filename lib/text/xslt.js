/**
 * An XSL transformer that uses Xalan-Java (http://xml.apache.org/xalan-j/)
 */

// Check if Xalan is installed.
var javaXSLT = typeof Packages !== "undefined" && 
               Packages && 
               Packages.javax && 
               Packages.javax.xml.transform &&
               Packages.javax.xml.transform.Transformer;
               
if (javaXSLT) {

    var JTransformerFactory = Packages.javax.xml.transform.TransformerFactory;
    var JStreamSource = Packages.javax.xml.transform.stream.StreamSource;
    var JStreamResult = Packages.javax.xml.transform.stream.StreamResult;
    var JStringReader = Packages.java.io.StringReader;
    var JStringWriter = Packages.java.io.StringWriter;
    var JDOMSource = Packages.javax.xml.transform.dom.DOMSource;
    var JDocumentBuilderFactory = Packages.javax.xml.parsers.DocumentBuilderFactory;
    var JInputSource = Packages.org.xml.sax.InputSource; 

    var JFile = Packages.java.io.File;
    var JFileReader = Packages.java.io.FileReader;
    
    var dbfactory = JDocumentBuilderFactory.newInstance();
    dbfactory.setNamespaceAware(true);
    dbfactory.setXIncludeAware(true);
    
    var parser = dbfactory.newDocumentBuilder();

    var tfactory = JTransformerFactory.newInstance();

    var file = require("file");

    /**
     * XSL: A compiled XSL document.
     */
    var XSL = exports.XSL = function(path) {
        if (file.exists(path)) {
            var xslr = new JFileReader(path);
            this.transformer = tfactory.newTransformer(
                new JStreamSource(xslr)
            );
        } else {
            throw "XSLT not found";
        }
    }

    /**
     * Transform the input xml string.
     */    
    XSL.prototype.transform = function(xml, path) {
        var systemId = new JFile(path || "").toURL().toExternalForm();        
    
        var is = new JInputSource(new JStringReader(xml));
        is.setSystemId(systemId);
        var xmls = parser.parse(is);

        var source = new JDOMSource(xmls, systemId);

        var outr = new JStringWriter();
        var result = new JStreamResult(outr);
        
        this.transformer.transform(source, result);
        
        return String(outr.toString());
    }

    var XSLT = exports.XSLT = {};

    /**
     * XSLT transformation of an xml string by an xsl string.
     * XInclude processing is enabled (but the base dir is inconvenient).
     */
    XSLT.transform = function(xml, xsl) {
        var xmls = parser.parse(new JInputSource(new JStringReader(xml)));
        var xsls = new JStringReader(xsl);
        var outr = new JStringWriter();

        tfactory.newTransformer(new JStreamSource(xsls)).transform(
            new JDOMSource(xmls), 
            new JStreamResult(outr)
        );
        
        return String(outr.toString());
    }

    /**
     * XSLT transformation of an xml file from an xsl file.
     * XInclude processing is enabled.
     */
    XSLT.transformFile = function(xmlPath, xslPath) {
        var xmls = parser.parse(new JFile(xmlPath));
        var xsls = new JFileReader(xslPath);
        var outr = new JStringWriter();

        tfactory.newTransformer(new JStreamSource(xsls)).transform(
            new JDOMSource(xmls), 
            new JStreamResult(outr)
        );
        
        return String(outr.toString());
    }

} else {
    print("XALAN is not installed, XSL transformation dissabled!");
} 

