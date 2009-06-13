var Paginator = require("nitro/utils/paginator").Paginator;

var Article = require("../../content/article").Article,
    Tag = require("../../content/tag").Tag;
    
exports.GET = function(env) {
    var db = openDatabase();
    var params = env.request.params();

    var pg = new Paginator(env, 5);
    var tag = db.query("SELECT id, name FROM Tag WHERE name=?", params.id).one(Tag);
    var articles = db.query("SELECT a.*, ca.id AS categoryId, ca.label AS categoryLabel, COUNT(c.parentId) AS commentCount FROM Article a LEFT JOIN TagToArticle tta ON tta.parentId=a.id LEFT JOIN Comment c ON a.id=c.parentId LEFT JOIN Category ca ON a.categoryId=ca.id WHERE tta.tagId=? GROUP BY a.id ORDER BY a.created DESC " + pg.sqlLimit(), tag.id).all(Article);

    return {
        tag: tag,
        articles: articles,
        paginator: pg.paginate(articles)
    }
}
