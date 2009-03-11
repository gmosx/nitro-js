var Article = require("blog/model/article").Article;

exports.app = function(request, response) {
    response.setData({
//        articles: [{ title: "hello", content: "world", id: "1", seoName: (function() { return "koko"; }) }]
        articles: $db.query("SELECT * FROM Article ORDER BY created DESC LIMIT 10").all(Article)
    });
}
