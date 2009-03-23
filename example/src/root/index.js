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

var encode = require("text/atom").Atom.encode;

exports.atom = function(request, response) {
    var articles = $db.query("SELECT * FROM Article ORDER BY created DESC LIMIT 10").all(Article);
	response.write(encode(
		articles, 
		{
			title: "Blog example",
			base: "http://localhost:8080",
			self: "http://localhost:8080/index.atom",
			updated: articles[0].created
		}
	));
}
