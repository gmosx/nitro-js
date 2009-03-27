var RelationalDatabase = require("database/rdb").Database;

var Database = exports.Database = function() {};

var databases = {};
var defaultDatabase;

/**
 * Register a new database in the application.
 */
Database.register = function(config) {
    var db = databases[config.name] = new RelationalDatabase(config);
    defaultDatabase = defaultDatabase || db;
    // FIXME: this is temporary.
    $db = defaultDatabase
}

/**
 * Get a connection to a database;
 */
openDatabase = function(name, version) {
    if (name)
        return databases[name];    
    else
        return defaultDatabase;
}
