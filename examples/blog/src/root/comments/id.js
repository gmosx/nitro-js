var Comment = require("blog/comment").Comment;
    
exports.DELETE = function(env) {
    var db = openDatabase();
    var params = env.request.params();
 
    db.execute("DELETE FROM Comment WHERE id=?", params.id);
 
    env.request.redirect();
}
