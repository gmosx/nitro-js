var Paginator = require("nitro/utils/paginator").Paginator;

var Article = require("app/content/article").Article,
    Category = require("app/content/category").Category;
    
exports.GET = function(env) {
    var db = openDatabase();
    var params = env.request.params();
    var id = params.id.split("/")[0];

    var pg = new Paginator(env, 5);
    var articles = db.query("SELECT a.*, ca.id AS categoryId, ca.label AS categoryLabel, COUNT(c.parentId) AS commentCount FROM Article a LEFT JOIN Comment c ON a.id=c.parentId LEFT JOIN Category ca ON a.categoryId=ca.id WHERE categoryId=? GROUP BY a.id ORDER BY a.created DESC " + pg.sqlLimit(), id).all(Article);
    var category = db.query("SELECT id, label FROM Category WHERE id=?", id).one(Category);

    return {
        category: category,
        articles: articles,
        paginator: pg.paginate(articles)
    }
}
