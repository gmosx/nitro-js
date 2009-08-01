Dogma
-----

Throwing and catching exceptions (for example redirect exceptions) in the middleware pipeline is *not* a good idea. Useful middleware maybe skipped and breaks Nitro's transparency aim.
 
Generate Content-Length response headers. It’s easy to do, and it will allow the response of your script to be used in a persistent connection. This allows clients to request multiple representations on one TCP/IP connection, instead of setting up a connection for every request. It makes your site seem much faster.
