var Comment = require("blog/comment").Comment,
    markup = require("blog/markup").markup;

exports.app = function(request, response) {
    if (request.isPost()) {
        var comment = request.params();

        $db.execute(
            "INSERT INTO Comment (parentId, name, email, uri, content) VALUES (?, ?, ?, ?, ?)",
            comment.parentId, comment.name, comment.email,
            comment.uri, markup(comment.content)
        );
        
        response.redirect();
    }
}

