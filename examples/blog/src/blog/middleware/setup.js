var Category = require("blog/category").Category,
    Comment = require("blog/comment").Comment,
    Aside = require("blog/middleware/aside").Aside;

exports.Setup = function(app) {

    return function(request, response) {
        app(request, response);

        // TODO: also check that Content-Type == text/html!
        if (request.isGet()) {        
            Aside(request, response);
        }
    }

}
