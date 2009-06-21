var Paginator = require("nitro/utils/paginator").Paginator,
    encode = require("nitro/utils/atom").Atom.encode;

var Article = require("../content/article").Article,
    Category = require("../content/category").Category;

exports.GET = function(env) {
    var db = openDatabase();

    if ("application/atom+xml" == env["CONTENT_TYPE"]) {
        var articles = db.query("SELECT * FROM Article ORDER BY created DESC LIMIT 10").all(Article);

        return encode(articles, {
		    title: "Blog example",
		    base: "http://localhost:8080",
		    self: "http://localhost:8080/index.atom",
		    updated: articles[0].created
	    });    
    } else {
        var pg = new Paginator(env, 5);
        var articles = db.query("SELECT a.*, ca.id AS categoryId, ca.label AS categoryLabel, COUNT(c.parentId) AS commentCount FROM Article a LEFT JOIN Comment c ON a.id=c.parentId LEFT JOIN Category ca ON a.categoryId=ca.id GROUP BY a.id ORDER BY a.created DESC " + pg.sqlLimit()).all(Article).map(function(a) {
            a.path = a.path();
            a.tagString = a.tagString_linked();
            return a;
        });

        return {
            articles: articles,
            paginator: pg.paginate(articles)
        };
    }
}

