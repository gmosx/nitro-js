<?xml version="1.0" ?>

<xsl:stylesheet version="1.0" 
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:xi="http://www.w3.org/2001/XInclude"
        xmlns:x="http://lib.unjou.org/Schemas/Style">

    <xsl:output method="html" encoding="UTF-8" />

    <!-- name templates -->
    
    <xsl:template name="x:head">
        <head>
            <title><xsl:if test="@title"><xsl:value-of select="@title" /> | </xsl:if>A simple blog</title>
            <link rel="stylesheet" media="screen" href="/screen.css" type="text/css" />
            <link rel="alternate" title="Blog Atom feed" href="/index.atom" type="application/atom+xml" />
            <meta name="description" content="A simple blog, powered by Nitro" />
            <meta name="keywords">
                <xsl:attribute name="content">{metaKeywords}</xsl:attribute>
            </meta>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <xsl:apply-templates select="x:head" mode="show" />
        </head>
    </xsl:template>

    <xsl:template name="x:header">
        <header>
            <h1><a href="/">A simple Blog</a></h1>
            <h2>The canonical Nitro example</h2>
            <nav><xsl:apply-templates select="x:breadcrumbs" mode="show" /></nav>
        </header>
    </xsl:template>

    <xsl:template name="x:footer">
        <footer>
            <p>Copyright © 2009 <a href="http://gmosx.com" target="blank">George Moschovitis</a>.</p>
        </footer>
    </xsl:template>
    
    <!-- match templates -->

    <!-- output HTML5 doctype
    http://www.mail-archive.com/whatwg@lists.whatwg.org/msg12983.html -->
    <xsl:template match="/">
        <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE HTML></xsl:text>
        <xsl:apply-templates />
    </xsl:template>

    <!-- preserve tags -->
    <xsl:template match="node()|@*">
        <xsl:copy>
	          <xsl:apply-templates select="node()|@*" />
        </xsl:copy>
    </xsl:template>

    <!-- strip PIs -->
    <xsl:template match="processing-instruction()">
    </xsl:template>

    <!-- strip xml:base -->
    <xsl:template match="@xml:base">
    </xsl:template>

    <!-- strip comments -->
    <xsl:template match="comment()">
    </xsl:template>

    <!-- use this tag to enclose fragments with a single element 
         as required for valid xml documents. --> 
    <xsl:template match="x:root">
        <xsl:apply-templates />
    </xsl:template>

    <xsl:template match="x:page">
        <html xml:lang="en" lang="en" dir="ltr">
            <xsl:call-template name="x:head" />
            <body>
                <xsl:call-template name="x:header" />
                <xsl:apply-templates />
                <xsl:call-template name="x:footer" />
                <script src="/jquery.js" type="text/javascript"></script>
                <xsl:apply-templates select="x:script[@href]" mode="href" />
                <script>
                    <xsl:apply-templates select="x:script[not(@href)]" mode="script" />
                </script>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="x:error-page">
        <html xml:lang="en" lang="en" dir="ltr">
            <head>
                <title>{statusString} | A simple blog</title>
                <link rel="stylesheet" href="/screen.css" type="text/css" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            </head>
            <body>
                <div class="error-dialog">
                    <xsl:apply-templates />
                </div>
            </body>
        </html>
    </xsl:template>

    <!--
    http://developer.yahoo.com/ypatterns/pattern.php?pattern=breadcrumbs
    -->
	<xsl:template match="x:breadcrumbs">
	</xsl:template>

	<xsl:template match="x:breadcrumbs" mode="show">
	    <a href="/">Home</a> <xsl:apply-templates />
	</xsl:template>

	<xsl:template match="x:head">
	</xsl:template>

	<xsl:template match="x:head" mode="show">
		<xsl:apply-templates />
	</xsl:template>

    <!--
    Injects a script before the body. Use <x:head> to inject a script in <head>.
    Handles external and internal script files.
    
    Example:
    <x:script href="/jquery.js" />
    <x:script>
        alert("it works");
    </x:script>
    <x:script>
        alert("really");
    </x:script>
    -->
	<xsl:template match="x:script">
	</xsl:template>

	<xsl:template match="x:script" mode="href">
        <script src="{@href}" type="text/javascript" />
	</xsl:template>

	<xsl:template match="x:script" mode="script">
        <xsl:apply-templates />
	</xsl:template>

    <xsl:template match="x:clear">
        <p class="clear" />
    </xsl:template>

    <!-- reddit button: http://www.reddit.com/buttons/ -->
    <xsl:template match="x:reddit">
        <script type="text/javascript" src="http://www.reddit.com/button.js?t=3"></script>
    </xsl:template>
         
</xsl:stylesheet>
