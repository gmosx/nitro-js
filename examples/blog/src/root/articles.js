var Article = require("blog/article").Article,
    markup = require("blog/markup").markup;

exports.POST = function(env) {
    var db = openDatabase();
    var params = env.request.params();
    
    var article;
    
    if (params.id) { // Update an existing object. 
        db.execute(
            "UPDATE Article SET title=?, content=?, categoryId=? WHERE id=?",
            params.title, markup(params.content), params.categoryId, params.id
        );
    } else { // Insert a new object.
        article = new Article();
        article.id = db.insert(
            "INSERT INTO Article (title, content, categoryId, created) VALUES (?, ?, ?, NOW())",
            params.title, markup(params.content), params.categoryId
        );
    }        

    article.updateTags(params.tagString);
    
    env.request.redirect("/");
}

