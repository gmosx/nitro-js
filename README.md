Nitro
=====

Nitro provides a library of carefully designed middleware and utilities for creating scalable, standards-compliant Web Applications with JavaScript. Nitro is build on top of Jack/JSGI, Narwhal/ServerJS and Rhino. 

Nitro applications leverage (strict) Web Standards like XHTML/HTML, CSS, HTTP, XML, XSLT, ECMAScript 3.0, MicroFormats, etc. Typically, Nitro applications are a collection of programs that run on the server *and* the client. A control program dispatches work to the application programs and aggregates their output. The application's output is consumed by modern web browsers, web services or other applications through a standard REST interface.

Homepage: http://nitrojs.org/

Source & Download: http://github.com/gmosx/nitro/

Mailing list: http://groups.google.com/group/nitro-devel

Issue tracking: http://github.com/gmosx/nitro/issues

IRC: #nitro on irc.freenode.net    


Getting Started
---------------

At the moment, Nitro requires customized versions of Narwhal and Jack. Please get patched versions from:
    
[http://github.com/gmosx/jack](http://github.com/gmosx/jack)
[http://github.com/gmosx/narwhal](http://github.com/gmosx/narwhal)

After you have installed Narwhal and Jack you are ready to run the simple example:

    $ cd examples/simple
    $ jackup 

The application will start listening at localhost:8080, so use your favourite browser to verify that everything works correctly.

For a more sophisticated exampe that implements a simple Blog on Google App Engine have a look at:

[blog-gae](http://github.com/gmosx/blog-gae/tree/master)    


Directory structure
-------------------

/lib:
Contains the implementation of the web application framework
    
/examples/simple:
Contains a simple example        


Google App Engine
-----------------

Nitro applications run great on Google App Engine. Have a look at the [blog-gae](http://github.com/gmosx/blog-gae/tree/master) example for a demonstration of using Nitro and [appengine](http://github.com/gmosx/appengine/tree/master) package to develop a simple Blog.


Layout
------

The Layout mechanism is an effective enhancement of the Template mechanism. A Layout is a standard template that accepts as input (and interpolates) 'content' templates. Moreover, it resolves include directives to allow for componentization of complex Templates.

The Layout mechanism is similar to Rails templates, but an example will better illustrate the concept.

layout.html (layout template):

    <html>
        <head>
            <title>{{title}}</title>
        </head>
        <body>
            <h1>{breadcrumbs</h1>
            <section>
                {yield}
            </section>
        </body>
    </html>

index.html (content template):

    {.layout "/layout.html"}

    <l:breadcrumbs>Home / hello</l:breadcrumbs>

    <h2>The content</h2>
    <p>
        Hello world!
        {.include "fragment.inc.html"}
    </p>

fragment.inc.html (fragment template):

    <span>I am included</span>

The output of the Layout filter is:

    <html>
        <head>
            <title>{title}</title>
        </head>
        <body>
            <h1>Home / hello</h1>
            <section>
                <h2>The content</h2>
                <p>
                    Hello world!
                    <span>I am included</span>
                </p>
            </section>
        </body>
    </html>

Please notice:

* {{title}} is unescaped to {title} after the Layout template evaluation (standard template behaviour). It will be interpolated at run time.

* <l:xxx>...</l:xxx> blocks define fragments that are passed as values to the 'layout' template. A special value called 'yield' captures the whole of the 'content' template.


Related projects
----------------

Nitro is an ecosystem of related projects:

* [appengine](http://github.com/gmosx/appengine/tree/master) 
* [template](http://github.com/gmosx/template/tree/master)
* [blog-gae](http://github.com/gmosx/blog-gae/tree/master)

    
Caveats
-------

Nitro is under intense development. Changes to the API are to be expected.        


Credits
-------

* George Moschovitis <george.moschovitis@gmail.com>
* Kris Kowal <kris.kowal@cixar.com>


License
-------

Copyright (c) 2009 George Moschovitis, http://gmosx.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
