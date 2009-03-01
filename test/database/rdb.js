#!/usr/bin/java org.mozilla.javascript.tools.shell.Main

$DEBUG = true;

$LOAD_PATH = "src:lib:../jack/lib"; 

load("../jack/core.js");

var Database = require("database/rdb").Database;

var db = new Database("jdbc:mysql://localhost/example?user=nitro&password=p@ssw0rd");

var sql = db.prepare("INSERT INTO Article (title, body) VALUES (?, ?)");

var id;

for (var i = 0; i < 10; i++) {
    id = db.insert(sql, "title " + i, "body " + 1);
    print("inserted: " + id);
}

var article = db.query("SELECT id, title FROM Article WHERE id=?", id).one();

print("title: " + article.title);

var articles = db.query("SELECT id, title FROM Article WHERE id>?", 20).all();

print("length: " + articles.length);

var Article = function(title, body) {
    this.title = title;
    this.body = body;
}

Article.prototype.dummy = function(extra) {
    return "---> " + this.title + " : " + extra;
}

var articles = db.query("SELECT id, title FROM Article WHERE id>? LIMIT 5", 20).all(Article);

for (var a in articles) {
    print(articles[a].dummy("this is extra"));
}

var articles = db.query("SELECT id, title FROM Article WHERE id>? LIMIT 5", 20).each(function(a) {
    print("*** " + a.dummy("forEach"));
}, Article);

