var hash = require("crc32").hash;

var NotFound = require("nitro/exceptions").NotFound;

var Article = require("../content/article").Article,
    Comment = require("../content/comment").Comment;
    
exports.GET= function(env) {
    var params = env.request.params();
    var id = params.id.split("/")[0];

    var db = openDatabase();
    
    var article = db.query("SELECT a.*, ca.id AS categoryId, ca.label AS categoryLabel FROM Article a LEFT JOIN Category ca ON a.categoryId=ca.id WHERE a.id=?", id).one(Article);
    
    if (!article) throw NotFound();
    
    var etag = hash(article.updated.toString());

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
        article.comments = db.query("SELECT * FROM Comment WHERE parentId=?", id).all(Comment).map(function(c) {
            c.gravatarURI = c.gravatarURI();
            c.authorLink = c.authorLink();
            return c;
        });
        article.commentCount = article.comments.length;
        article.metaKeywords = article.tagString;
        
        return [
            200, {
                "Cache-Control": "public; must-revalidate",
                "Last-Modified": Date.fromSQLString(article.updated).toGMTString(),
                "ETag": etag
            },
            article
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
