Nitro
=====

Nitro provides a library of carefully designed middleware and utilities for creating scalable, standards-compliant Web Applications with JavaScript. Nitro is build on top of Jack/JSGI, CommonJS and Rhino. 

Nitro applications leverage (strict) Web Standards like XHTML/HTML, CSS, HTTP, XML, XSLT, ECMAScript 3.0, MicroFormats, etc. Typically, Nitro applications are a collection of programs that run on the server *and* the client. A control program dispatches work to the application programs and aggregates their output. The application's output is consumed by modern web browsers, web services or other applications through a standard REST interface.

Nitro is engineered to work great with Google App Engine.

* Homepage: [http://nitrojs.org/](http://nitrojs.org/)
* Status updates: [http://twitter.com/nitrojs](http://twitter.com/nitrojs)
* Source & Download: [http://github.com/gmosx/nitro/](http://github.com/gmosx/nitro/)
* Documentation: [http://nitrojs.org/docs](http://nitrojs.org/docs)
* Mailing list: [http://groups.google.com/group/nitro-devel](http://groups.google.com/group/nitro-devel)
* Issue tracking: [http://github.com/gmosx/nitro/issues](http://github.com/gmosx/nitro/issues)
* IRC: #nitrojs on [irc.freenode.net](http://freenode.net/)    


Getting Started
---------------

An older version of Nitro was powered by [Narwhal](http://www.narwhaljs.org] but we have switched to [RingoJS](http://www.ringojs.org) due to better support for [Rhino](http://www.mozilla.org/rhino). Still, we 'll try hard to keep future Nitro versions compatible with Narwhal.

To install Ringo, follow the instructions here:

[http://ringojs.org/wiki/Getting_Started](http://ringojs.org/wiki/Getting_Started)

Then, you should install the nitro package:

    $ ringo-admin gmosx/nitro
    $ ringo-admin gmosx/narwhal-lib
    $ ringo-admin gmosx/jack-lib
    $ ringo-admin gmosx/normal-template

Finally, you are ready to run the simple example:

    $ cd example
    $ ringo config.js

The application will start listening at localhost:8080, so use your favourite browser to verify that everything works correctly.

For a more sophisticated example that implements a simple Blog on Google App Engine have a look at:

[appengine-blog-example](http://www.nitrojs.org/appenginejs/appengine-blog-example.tar.gz)


Google App Engine
-----------------

Nitro applications run great on Google App Engine. Have a look at the [appengine-blog-example](http://www.nitrojs.org/appenginejs/appengine-blog-example.tar.gz) example for a demonstration of using Nitro and [appengine](http://github.com/gmosx/appengine/tree/master) package to develop a simple Blog.


Directory structure
-------------------

/docs:
Contains documentation files in markdown format. The docs are published at www.nitrojs.org/docs

/lib:
Contains the implementation of the web application framework
    
/example:
Contains a simple example        

/test:
Contains unit and functional tests.        


Related projects
----------------

Nitro is an ecosystem of Web Application development tools:

* [appengine](http://github.com/gmosx/appengine) 
* [normal-template](http://github.com/gmosx/normal-template)
* [htmlparser](http://github.com/gmosx/htmlparser)
* [markdown](http://www.github.com/gmosx/markdown)
* [inflection](http://github.com/gmosx/inflection)

Other related projects:

* [appengine-blog-example](http://www.nitrojs.org/appenginejs/appengine-blog-example.tar.gz)

    
Caveats
-------

Nitro is under intense development. Changes to the API are to be expected.        


Credits
-------

* George Moschovitis, [george.moschovitis@gmail.com](mailto:george.moschovitis@gmail.com)
* Panagiotis Astithas, [pastith@gmail.com](mailto:george.moschovitis@gmail.com)


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
