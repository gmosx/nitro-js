require("lang/date");

var md5 = require("data/digest/md5").MD5.hexdigest;

var NotFound = require("nitro/exceptions").NotFound;

var Article = require("blog/article").Article,
    Comment = require("blog/comment").Comment;
    
exports.GET= function(env) {
    var params = env.request.params();
    var id = params.id.split("/")[0];

    var db = openDatabase();
    
    var article = db.query("SELECT a.*, ca.id AS categoryId, ca.label AS categoryLabel FROM Article a LEFT JOIN Category ca ON a.categoryId=ca.id WHERE a.id=?", id).one(Article);
    
    if (!article) throw NotFound();
    
    var etag = md5(article.updated.toString());

    if (env["HTTP_IF_NONE_MATCH"] == etag) {
        throw [
            304, {
//              "X-Cache": "HIT",
//              "X-Cache-Lookup": "HIT",
                "Cache-Control": "public; must-revalidate",
                "Last-Modified": Date.fromSQLString(article.updated).toGMTString(),
                "ETag": etag
            }, 
            ""
        ];
    } else {
        var comments = db.query("SELECT * FROM Comment WHERE parentId=?", id).all(Comment);
        
        article.commentCount = comments.length;
        
        return [
            200, {
                "Cache-Control": "public; must-revalidate",
                "Last-Modified": Date.fromSQLString(article.updated).toGMTString(),
                "ETag": etag
            }, {
                article: article,
                metaKeywords: article.tagString,
                comments: comments
            }
        ];
    }
}

exports.DELETE = function(env) {
    var params = env.request.params();
    var id = params.id.split("/")[0];

    var db = openDatabase();

    db.execute("DELETE FROM Article WHERE id=?", id);

    env.request.redirect();
}
