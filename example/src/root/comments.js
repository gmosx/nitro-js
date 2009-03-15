var Comment = require("blog/comment").Comment,
    markup = require("blog/markup").markup;

exports.app = function(request, response) {
    if (request.isPost()) {
        var comment = request.params();

        $db.execute(
            "INSERT INTO Comment (parentId, authorName, authorEmail, authorURI, content) VALUES (?, ?, ?, ?, ?)",
            comment.parentId, comment.authorName, comment.authorEmail,
            comment.authorURI, markup(comment.content)
        );
        
        response.redirect();
    }
}

