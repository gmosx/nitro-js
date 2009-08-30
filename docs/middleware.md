Middleware
==========

The essence of Nitro is a pipeline of Jack middleware apps. This pipeline provides just enough functionality on top of Jack to help you write Web applications with ease and joy.


Dispatcher
----------

The dispatcher selects an upstream application that corresponds to the PATH_INFO. It looks for applications in CONFIG.appRoot. For example given the PATH_INFO:

    /articles/view?id=1234

it selects the module:

    {CONFIG.appRoot}/articles/view.js

From this module it calls the exported GET JSGI application.


Render
------

If the response object returned from upstream contains JSON data, uses this data to evaluate a template that corresponds to PATH_INFO. The response body is set to the rendered template string.


Normalize
---------

Normalizes the Request PATH_INFO. It applies two rewrite rules:

    / -> /index.html
    my/path/*value -> /my/path/id?id=value

The second rule handles a common case for 'nice' urls.


Errors
------

Catches thrown errors and renders an error page.


SessionManager
--------------

Manages cookie based sessions. Please remember that Web applications should be stateless, ie session variables should be avoided.
