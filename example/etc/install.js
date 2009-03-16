#!/usr/bin/java org.mozilla.javascript.tools.shell.Main

// Run this script to start the example application. You may need to change the
// 'shebang' line at the top of this file.

load("etc/config.js");
$LOAD_PATH = "src:lib:" + CONFIG.paths.nitro + "/src:" + CONFIG.paths.nitro + "/lib:" + CONFIG.paths.jack + "/lib"; 
load(CONFIG.paths.jack + "/core.js");

var exec = require("process").Process.exec;

// Initialize database schema.
exec("mysql -u " + CONFIG.database.user + " -p " + CONFIG.database.name + " < etc/schema.sql");

/*
// Initialize categories.
var Database = require("database/rdb").Database;
Database.setAdapter(CONFIG.database.adapter);
$db = new Database(CONFIG.database);

var sql = $db.prepare("INSERT INTO Category (label, term) VALUES (?, ?)");
$db.insert(sql, "Life", "life");
$db.insert(sql, "Technology", "technology");
$db.insert(sql, "Business", "business");
$db.insert(sql, "Art", "art");
*/
