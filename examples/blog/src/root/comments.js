var Comment = require("blog/comment").Comment,
    markup = require("blog/markup").markup;

exports.POST = function(env) {
    var db = openDatabase();
    var comment = env.request.params();

    db.execute(
        "INSERT INTO Comment (parentId, name, email, uri, content) VALUES (?, ?, ?, ?, ?)",
        comment.parentId, comment.name, comment.email,
        comment.uri, markup(comment.content)
    );
    
    env.request.redirect();
}

