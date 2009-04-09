var Comment = require("app/content/comment").Comment;
    
exports.DELETE = function(env) {
    var db = openDatabase();
    var params = env.request.params();
 
    var comment = db.query("SELECT parentId FROM Comment WHERE id=?", params.id).one(Comment);
    
    db.execute("DELETE FROM Comment WHERE id=?", params.id);
    db.execute("UPDATE Article SET updated=NOW() WHERE id=?", comment.parentId);
 
    env.request.redirect();
}
