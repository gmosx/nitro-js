var Article = require("blog/article").Article,
    Category = require("blog/category").Category;

exports.app = function(request, response) {
    var params = request.params();
    
    var article;
    
    if (params.id) {
        article = $db.query("SELECT * FROM Article WHERE id=?", params.id).one(Article);
    } else {
        article = new Article();
    }
    
    response.setData({
        article: article,
        categories: $db.query("SELECT id, title FROM Category ORDER BY title").all(Category)
    });
}
