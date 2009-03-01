var RDB = require("db/rdbms").RDB;

var Article = exports.Article = function(title, body) {
    
    this.title = title;
    this.body = body;

}

Article.DB = function() {}

RDB.manage(Article, {
    table: "Article",
    fields: [ "id", "title", "body" ]
});

