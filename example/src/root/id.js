var Article = require("blog/article").Article;

exports.app = function(request, response) {
    var params = request.params();
    response.setData({
        article: $db.query("SELECT * FROM Article WHERE id=?", params.id).one(Article)
    });
}
