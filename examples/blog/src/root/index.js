var Paginator = require("nitro/utils/paginator").Paginator;

var Article = require("blog/article").Article,
    Category = require("blog/category").Category;

exports.app = function(request, response) {
    var db = openDatabase();
    var pg = new Paginator(request, 5);
    var articles = db.query("SELECT a.*, ca.id AS categoryId, ca.label AS categoryLabel, COUNT(c.parentId) AS commentCount FROM Article a LEFT JOIN Comment c ON a.id=c.parentId LEFT JOIN Category ca ON a.categoryId=ca.id GROUP BY a.id ORDER BY a.created DESC " + pg.sqlLimit()).all(Article);

    response.setData({
        articles: articles,
        paginator: pg.paginate(articles)
    });
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

