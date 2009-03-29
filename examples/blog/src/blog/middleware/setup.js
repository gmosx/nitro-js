var Category = require("blog/category").Category,
    Comment = require("blog/comment").Comment,
    Aside = require("blog/middleware/aside").Aside;

exports.Setup = function(app) {

    return function(env) {
        var response = app(env);
        
        if (typeof(response[2]) != "string")
            if (env["REQUEST_METHOD"] == "GET") // TODO: also check that Content-Type == text/html!
                response[2] = Aside(response[2])[2];
        
        return response;
    }

}
