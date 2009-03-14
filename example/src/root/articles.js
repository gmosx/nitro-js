var Article = require("blog/article").Article,
    markup = require("blog/markup").markup;

exports.app = function(request, response) {
    if (request.isPost()) {
        var params = request.params();
        
        var article;
        
        if (params.id) { // Update an existing object. 
            $db.execute(
                "UPDATE Article SET title=?, content=?, categoryId=? WHERE id=?",
                params.title, markup(params.content), params.categoryId, params.id
            );
        } else { // Insert a new object.
            article = new Article();
            article.id = $db.execute(
                "INSERT INTO Article (title, content, categoryId) VALUES (?, ?, ?)",
                params.title, markup(params.content), params.categoryId
            );
        }        
        
        response.redirect("/");
    }
}

