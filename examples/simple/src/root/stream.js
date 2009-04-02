var Chunked = require("nitro/chunked").Chunked;

var JThread = Packages.java.lang.Thread;

var stream = function(write) {
    for (var i = 0; i < 50; i++) { 
        JThread.currentThread().sleep(500); 
        write("hello<br />"); 
    }
}

exports.GET = function(env) {
    return new Chunked(stream);
}

