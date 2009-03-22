var Paginator = require("nitro/utils/paginator").Paginator;

var Article = require("blog/article").Article,
    Category = require("blog/category").Category,
    Aside = require("blog/widgets/aside").Aside;

exports.app = function(request, response) {
    var pg = new Paginator(request, 5);
    var articles = $db.query("SELECT * FROM Article ORDER BY created DESC " + pg.sqlLimit()).all(Article);

    response.setData({
        articles: articles,
        paginator: pg.paginate(articles)
    });
    
    Aside(request, response);
}
