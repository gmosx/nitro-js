var Category = require("blog/category").Category,
    Comment = require("blog/comment").Comment;

exports.Aside = function(request, response) {
    response.setData({
        asideCategories: $db.query("SELECT id, label, term FROM Category ORDER BY label").all(Category),
        asideLatestComments: $db.query("SELECT c.name, c.created, c.parentId, a.title AS articleTitle FROM Comment AS c JOIN Article AS a ON c.parentId=a.id ORDER BY c.created DESC LIMIT 10").all(Comment)
    });
}
