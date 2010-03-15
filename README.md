Nitro
=====

Nitro provides a library of carefully designed middleware and utilities for creating scalable, standards-compliant Web Applications with JavaScript. Nitro is build on top of Jack/JSGI, Narwhal/CommonJS and Rhino. 

Nitro applications leverage (strict) Web Standards like XHTML/HTML, CSS, HTTP, XML, XSLT, ECMAScript 3.0, MicroFormats, etc. Typically, Nitro applications are a collection of programs that run on the server *and* the client. A control program dispatches work to the application programs and aggregates their output. The application's output is consumed by modern web browsers, web services or other applications through a standard REST interface.

* Homepage: [http://nitrojs.org/](http://nitrojs.org/)
* Status updates: [http://twitter.com/nitrojs](http://twitter.com/nitrojs)
* Source & Download: [http://github.com/gmosx/nitro/](http://github.com/gmosx/nitro/)
* Documentation: [http://nitrojs.org/docs](http://nitrojs.org/docs)
* Mailing list: [http://groups.google.com/group/nitro-devel](http://groups.google.com/group/nitro-devel)
* Issue tracking: [http://github.com/gmosx/nitro/issues](http://github.com/gmosx/nitro/issues)
* IRC: #nitrojs on [irc.freenode.net](http://freenode.net/)    


Getting Started
---------------

At the moment, Nitro requires customized versions of Narwhal and Jack. Please get patched versions from:
    
[http://github.com/gmosx/jack](http://github.com/gmosx/jack)
[http://github.com/gmosx/narwhal](http://github.com/gmosx/narwhal)

After you have installed Narwhal and Jack you are ready to run the simple example:

    $ cd example
    $ jackup 

The application will start listening at localhost:8080, so use your favourite browser to verify that everything works correctly.

For a more sophisticated example that implements a simple Blog on Google App Engine have a look at:

[appengine-example](http://www.nitrojs.org/appenginejs/appengine-example.tar.gz)


Directory structure
-------------------

/docs:
Contains documentation files in markdown format. The docs are published at www.nitrojs.org/docs

/lib:
Contains the implementation of the web application framework
    
/example:
Contains a simple example        

/tests:
Contains unit and functional tests.        


Google App Engine
-----------------

Nitro applications run great on Google App Engine. Have a look at the [appengine-example](http://www.nitrojs.org/appenginejs/appengine-example.tar.gz) example for a demonstration of using Nitro and [appengine](http://github.com/gmosx/appengine/tree/master) package to develop a simple Blog.


Related projects
----------------

Nitro is an ecosystem of Web Application development tools:

* [appengine](http://github.com/gmosx/appengine) 
* [normal-template](http://github.com/gmosx/normal-template)
* [htmlparser](http://github.com/gmosx/htmlparser)
* [ui](http://github.com/gmosx/ui)
* [markdown](http://www.github.com/gmosx/markdown)

Other related projects:

* [appengine-example](http://www.nitrojs.org/appenginejs/appengine-example.tar.gz)

    
Caveats
-------

Nitro is under intense development. Changes to the API are to be expected.        


Credits
-------

* George Moschovitis <george.moschovitis@gmail.com>


License
-------

Copyright (c) 2009-2010 George Moschovitis, [http://www.gmosx.com](http://www.gmosx.com)

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
