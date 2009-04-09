#!/usr/bin/env narwhal

load("etc/config.js");

var exec = require("process").Process.exec;

// Initialize database schema.
exec("mysql -u " + CONFIG.database.user + " -p " + CONFIG.database.name + " < etc/schema.sql");

require("database").Database.register(CONFIG.database);

var db = openDatabase();

var sql = db.prepare("INSERT INTO Category (label, term) VALUES (?, ?)");
db.insert(sql, "Life", "life");
db.insert(sql, "Technology", "technology");
db.insert(sql, "Business", "business");
db.insert(sql, "Art", "art");
