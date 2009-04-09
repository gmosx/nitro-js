var Hash = require("hash").Hash;

var Category = require("app/content/category").Category,
    Comment = require("app/content/comment").Comment;

exports.Aside = function(env) {
    var db = openDatabase();
    
    Hash.update(env, { 
        asideCategories: db.query("SELECT id, label, term FROM Category ORDER BY label").all(Category),
        asideLatestComments: db.query("SELECT c.name, c.created, c.parentId, a.title AS articleTitle FROM Comment AS c JOIN Article AS a ON c.parentId=a.id ORDER BY c.created DESC LIMIT 10").all(Comment)
    });
    
    return [null, null, env];
}
