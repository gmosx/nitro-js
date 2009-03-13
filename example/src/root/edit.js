var Article = require("blog/model/article").Article;

exports.app = function(request, response) {
    var params = request.params;
    
    var article;
    
    if (params.id) {
        article = $db.query("SELECT * FROM Article WHERE id=?", params.id).one(Article);
    } else {
        article = new Article();
    }
    
    response.setData({
        action: "",
        article: article
    });
}
