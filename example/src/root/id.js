var Article = require("blog/article").Article;

exports.app = function(request, response) {
    var params = request.params();

    switch (request.requestMethod()) {
        case "GET":
            response.setData({
                article: $db.query("SELECT * FROM Article WHERE id=?", params.id).one(Article)
            });
        case "DELETE":
            $db.execute("DELETE FROM Article WHERE id=?", params.id);
            response.redirect();
    }
}
