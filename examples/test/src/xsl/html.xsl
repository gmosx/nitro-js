<?xml version="1.0" ?>

<xsl:stylesheet version="1.0" 
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:xi="http://www.w3.org/2001/XInclude"
        xmlns:x="http://lib.unjou.org/xml/schemas/style">

    <xsl:output method="html" encoding="UTF-8" />
<!--        
    <xsl:output method="xml" encoding="UTF-8" indent="no" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" doctype-system="http://
www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"/>    
-->

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
            <title>Example</title>
            <link rel="stylesheet" type="text/css" href="/screen.css" />
            <meta name="description" content="Nitro example" />
            <meta name="keywords" content="dummy,little, keyword" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        </head>
    </xsl:template>

    <xsl:template name="x:header">
      	<div id="hd">
    		<div id="header">
    		    <a href="/"><img src="/img/gmosx.png" alt="gmosx" title="Gmosx blog" /></a>
      	    </div>
      	</div>
    </xsl:template>

    <xsl:template name="x:footer">
      	<div id="ft"><div id="ft2">
      	    <div id="footer">
                Copyright © 2009 <a href="http://gmosx.com" target="blank">George Moschovitis</a>. 
            </div>
        </div></div>
    </xsl:template>
    
    <!-- match templates -->

    <xsl:template match="x:doc">
        <html>
            <xsl:call-template name="x:head" />
            <body class="yui-skin-sam">
                <div id="doc">
                    <xsl:call-template name="x:header" />
                    <div id="nav">
		                <xsl:apply-templates select="x:breadcrumbs" mode="show" />
                    </div>
                    <div id="bd">
                        <div id="yui-main">
                            <xsl:apply-templates />
                        </div>
                    </div>
                </div>
                <xsl:call-template name="x:footer" />
            </body>
        </html>
    </xsl:template>

	<xsl:template match="x:script">
	</xsl:template>

	<xsl:template match="x:script" mode="show">
		<xsl:apply-templates />
	</xsl:template>

    <xsl:template match="x:script-ref">
    </xsl:template>

    <xsl:template match="x:script-ref" mode="show">
        <script href="{@href}" />
    </xsl:template>
	
	<xsl:template match="x:aside">
	</xsl:template>

	<xsl:template match="x:aside" mode="show">
		<xsl:apply-templates />
	</xsl:template>

    <xsl:template match="x:nav">
    </xsl:template>

    <xsl:template match="x:nav" mode="show">
		<xsl:apply-templates />
    </xsl:template>

    <!-- reddit button: http://www.reddit.com/buttons/ -->
    <xsl:template match="x:reddit">
        <script type="text/javascript" src="http://www.reddit.com/button.js?t=3"></script>
    </xsl:template>
         
</xsl:stylesheet>
