var chunked = require("nitro/response").Response.chunked;

var JThread = Packages.java.lang.Thread;

var stream = function(write) {
    for (var i = 0; i < 50; i++) { 
        JThread.currentThread().sleep(200); 
        write("hello world, this is a streaming example for nitro. enjoy the ride! We will be back in 200ms!<br />"); 
    }
}

exports.GET = function(env) {
    return chunked(stream);
}

