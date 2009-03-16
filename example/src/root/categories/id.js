var Article = require("blog/article").Article,
    Category = require("blog/category").Category,
    Aside = require("blog/widgets/aside").Aside;
    
exports.app = function(request, response) {
    var params = request.params();
    var id = params.id.split("/")[0];
    
    if (request.isGet()) {
        response.setData({
            category: $db.query("SELECT id, label FROM Category WHERE id=?", id).one(Category),
            articles: $db.query("SELECT * FROM Article WHERE categoryId=?", id).all(Article)
        });
    } 

    Aside(request, response);
}
