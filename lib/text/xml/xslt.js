// An XSL transformer that uses Xalan-Java (http://xml.apache.org/xalan-j/)

// Check if Xalan is installed.
var javaXSLT = typeof Packages !== "undefined" && 
               Packages && 
               Packages.javax && 
               Packages.javax.xml.transform &&
               Packages.javax.xml.transform.Transformer;
               
if (javaXSLT) {

    var JTransformerFactory = Packages.javax.xml.transform.TransformerFactory;
    var JTransformer = Packages.javax.xml.transform.Transformer;
    var JStreamSource = Packages.javax.xml.transform.stream.StreamSource;
    var JStreamResult = Packages.javax.xml.transform.stream.StreamResult;
    var JStringReader = Packages.java.io.StringReader;
    var JStringWriter = Packages.java.io.StringWriter;
    
    var jfactory = JTransformerFactory.newInstance();
    
    var XSLT = exports.XSLT = {};

    /**
     * XSLT transformation.
     */
    XSLT.transform = function(xml, xsl) {
        var xmls = new JStringReader(xml);
        var xsls = new JStringReader(xsl);
        var outr = new JStringWriter();
        
        jfactory.newTransformer(new JStreamSource(xsls)).transform(
            new JStreamSource(xmls), 
            new JStreamResult(outr)
        );
        
        return String(outr.toString());
    }

} else {
    print("XALAN is not installed, XSL transformation dissabled!");
} 

