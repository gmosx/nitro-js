var Paginator = require("nitro/utils/paginator").Paginator;

var Article = require("blog/article").Article,
    Category = require("blog/category").Category,
    Aside = require("blog/widgets/aside").Aside;
    
exports.app = function(request, response) {
    var params = request.params();
    var id = params.id.split("/")[0];

    var pg = new Paginator(request, 5);
    var articles = $db.query("SELECT * FROM Article WHERE categoryId=? ORDER BY created DESC " + pg.sqlLimit(), id).all(Article);
    
    if (request.isGet()) {
        response.setData({
            category: $db.query("SELECT id, label FROM Category WHERE id=?", id).one(Category),
            articles: articles,
            paginator: pg.paginate(articles)
        });
    } 

    Aside(request, response);
}
