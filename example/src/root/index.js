var Article = require("blog/article").Article,
    Category = require("blog/category").Category,
    Aside = require("blog/widgets/aside").Aside;

exports.app = function(request, response) {
    response.setData({
        articles: $db.query("SELECT * FROM Article ORDER BY created DESC LIMIT 10").all(Article),
    });
    
    Aside(request, response);
}
