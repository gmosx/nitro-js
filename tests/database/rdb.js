#!/usr/bin/java org.mozilla.javascript.tools.shell.Main

$DEBUG = true;

$LOAD_PATH = "src:lib:../jack/lib"; 

load("../jack/core.js");

var Database = require("database/rdb").Database;

var db = new Database("jdbc:mysql://localhost/example?user=nitro&password=p@ssw0rd");

// pre-prepare the statement
var sql = db.prepare("INSERT INTO Article (title, body) VALUES (?, ?)");

var id;

for (var i = 0; i < 10; i++) {
    // use the prepared statement.
    id = db.insert(sql, "title " + i, "body " + 1);
    print("inserted: " + id);
}

// query for one object.
var article = db.query("SELECT id, title FROM Article WHERE id=?", id).one();

print("title: " + article.title);

// query for many objects.
var articles = db.query("SELECT id, title FROM Article WHERE id>?", 20).all();

print("length: " + articles.length);

var Article = function(title, body) {
    this.title = title;
    this.body = body;
}

Article.prototype.dummy = function(extra) {
    return "---> " + this.title + " : " + extra;
}

// query for many objects, deserialize in a specific javascript object 'class'.
var articles = db.query("SELECT id, title FROM Article WHERE id>? LIMIT 5", 20).all(Article);

for (var a in articles) {
    print(articles[a].dummy("this is extra"));
}

// use a result iterator for optimized result processing.
var articles = db.query("SELECT id, title FROM Article WHERE id>? LIMIT 5", 20).forEach(function(a) {
    print("*** " + a.dummy("forEach"));
}, Article);

