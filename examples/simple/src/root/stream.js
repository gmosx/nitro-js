var Response = require("nitro/response").Response;

exports.GET = function(env) {
    var response = new Response(200, {"Transfer-Encoding":"chunked"});
    return response.finish(function(res) {
        for (var i = 0; i < 50; i++) { 
            Packages.java.lang.Thread.currentThread().sleep(500); 
            res.write("hello<br />"); 
        }
    });
}
