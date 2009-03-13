<?xml version="1.0" ?>

<xsl:stylesheet version="1.0" 
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:xi="http://www.w3.org/2001/XInclude"
        xmlns:x="http://lib.unjou.org/Schemas/Style">

    <xsl:output method="html" encoding="UTF-8" />

    <xsl:template match="/">
        <!-- output HTML5 doctype
        http://www.mail-archive.com/whatwg@lists.whatwg.org/msg12983.html -->
        <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE HTML></xsl:text>
        <xsl:apply-templates />
    </xsl:template>

    <!-- preserve tags -->
    
    <xsl:template match="node()|@*">
        <xsl:copy>
	          <xsl:apply-templates select="node()|@*" />
        </xsl:copy>
    </xsl:template>

    <!-- use this tag to enclose fragments with a single element 
         as required for valid xml documents. --> 
         
    <xsl:template match="x:root">
        <xsl:apply-templates />
    </xsl:template>

    <!-- name templates -->
    
    <xsl:template name="x:head">
        <head>
            <title>A simple blog</title>
            <link rel="stylesheet" href="/screen.css" type="text/css" />
            <meta name="description" content="A simple blog, powered by Nitro" />
            <meta name="keywords" content="nitro, blog, example" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		    <xsl:apply-templates select="x:in-head" mode="show" />
        </head>
    </xsl:template>

    <xsl:template name="x:header">
        <header>
            <h1><a href="/">A simple Blog</a></h1>
            <h2>The canonical Nitro example</h2>
        </header>
    </xsl:template>

    <xsl:template name="x:footer">
        <footer>
            <p>Copyright © 2009 <a href="http://gmosx.com" target="blank">George Moschovitis</a>.</p>
        </footer>
    </xsl:template>
    
    <!-- match templates -->

    <xsl:template match="x:page">
        <html>
            <xsl:call-template name="x:head" />
            <body>
                <xsl:call-template name="x:header" />
                <xsl:apply-templates />
                <xsl:call-template name="x:footer" />
            </body>
        </html>
    </xsl:template>

	<xsl:template match="x:in-head">
	</xsl:template>

	<xsl:template match="x:in-head" mode="show">
		<xsl:apply-templates />
	</xsl:template>

    <!-- reddit button: http://www.reddit.com/buttons/ -->
    <xsl:template match="x:reddit">
        <script type="text/javascript" src="http://www.reddit.com/button.js?t=3"></script>
    </xsl:template>
         
</xsl:stylesheet>
