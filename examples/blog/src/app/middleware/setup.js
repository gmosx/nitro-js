var Category = require("app/content/category").Category,
    Comment = require("app/content/comment").Comment;
    
var Aside = require("app/middleware/aside").Aside;

exports.Setup = function(app) {

    return function(env) {
        var response = app(env);
        
        if (typeof(response[2]) != "string")
            if (env["REQUEST_METHOD"] == "GET") { // TODO: also check that Content-Type == text/html!
                var data = Aside(response[2])[2];
 
                if (!data.metaKeywords)
                    data.metaKeywords = "nitro,blog,example,javascript";

                response[2] = data;
            }
        
        return response;
    }

}
