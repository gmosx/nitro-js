var Article = require("blog/model/article").Article;

exports.app = function(request, response) {
    var params = request.params();
    response.setData({
        article: $db.query("SELECT * FROM Article WHERE id=?", params.id).one(Article)
    });
}
