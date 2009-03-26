var Article = require("blog/article").Article,
    Comment = require("blog/comment").Comment,
    Aside = require("blog/widgets/aside").Aside;
    
exports.app = function(request, response) {
    var params = request.params();
    var id = params.id.split("/")[0];
    
    if (request.isGet()) {
        var article = $db.query("SELECT a.*, ca.id AS categoryId, ca.label AS categoryLabel FROM Article a LEFT JOIN Category ca ON a.categoryId=ca.id WHERE a.id=?", id).one(Article);
        var comments = $db.query("SELECT * FROM Comment WHERE parentId=?", id).all(Comment);
        
        article.commentCount = comments.length;
        
        response.setData({
            article: article,
            comments: comments
        });

        Aside(request, response);
    } else if (request.isDelete()) {
        $db.execute("DELETE FROM Article WHERE id=?", id);
        response.redirect();
    } else /* isPut() */ {
    }
}
