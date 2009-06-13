var Category = require("./content/category").Category,
    Comment = require("./content/comment").Comment;
    
var Aside = require("./aside").Aside;

exports.Wrap = function(app) {

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
