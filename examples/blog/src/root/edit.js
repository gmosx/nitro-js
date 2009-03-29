var Article = require("blog/article").Article,
    Category = require("blog/category").Category;

exports.GET = function(env) {
    var db = openDatabase();
    var params = env.request.params();
    
    var article;
    
    if (params.id) {
        article = db.query("SELECT * FROM Article WHERE id=?", params.id).one(Article);
    } else {
        article = new Article();
    }
    
    return {
        article: article,
        categories: db.query("SELECT id, label FROM Category ORDER BY label").all(Category)
    }
}
