Middleware
==========

The essence of Nitro is a pipeline of Jack middleware apps. This pipeline provides just enough functionality on top of Jack to help you write Web applications with ease and joy.

Dispatcher
----------

The dispatcher selects an upstream application that corresponds to the PATH_INFO.


Render
------

If the response object returned from upstream contains JSON data, uses this data to evaluate a template that corresponds to PATH_INFO. The response body is set to the rendered template string.


Normalize
---------

Normalize the Request PATH_INFO.

Errors
------

Catches thrown errors and renders an error page.


SessionManager
--------------

Manages cookie based sessions. Please remember that Web applications should be stateless, ie session variables should be avoided.
