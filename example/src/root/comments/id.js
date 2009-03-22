var Comment = require("blog/comment").Comment;
    
exports.app = function(request, response) {
    var params = request.params();

    if (request.isDelete()) {
        $db.execute("DELETE FROM Comment WHERE id=?", params.id);
        response.redirect();
    }
}
