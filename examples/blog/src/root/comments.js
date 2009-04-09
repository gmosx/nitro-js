var Hash = require("hash").Hash;

var Template = require("nitro/utils/template").Template;

var Comment = require("app/content/comment").Comment,
    markup = require("app/content/markup").markup;

var template = Template.load("src/root/comments/comment.inc.html");

exports.POST = function(env) {
    var db = openDatabase();
    var comment = Hash.merge(new Comment(), env.request.params());

    db.execute(
        "INSERT INTO Comment (parentId, name, email, uri, content) VALUES (?, ?, ?, ?, ?)",
        comment.parentId, comment.name, comment.email,
        comment.uri, markup(comment.content)
    );

    // Touch the article (update ..updated)
    // THINK: trigger?
    db.execute("UPDATE Article SET updated=NOW() WHERE id=?", comment.parentId);

    if (true) { // FIXME: Check XMLHTTPRequest!
        comment.created = new Date();
        return [200, {}, template.render({ comment: comment })];
    } else {
        env.request.redirect();
    }
}

