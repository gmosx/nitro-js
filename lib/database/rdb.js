// Powered by JDBC.

var JDriverManager = Packages.java.sql.DriverManager;

/**
 * A relational database interface.
 *
 * See test/database/rdb.js for example usage.
 */
var Database = exports.Database = function(config) {
    var connectURI;
    
    Database.registerDriver(config);              
    
    if (config.connectURI) {
        connectURI = config.connectURI;
    } else {
        connectURI = "jdbc:" + config.system + "://" + config.host + "/" + config.name + 
              "?user=" + config.user + "&password=" + config.password;
    }
    
    this.conn = JDriverManager.getConnection(connectURI);
};

/**
 * Register a specific database driver implementation.
 * FIXME: this is uggly, find a better solution.
 */
Database.registerDriver = function(config) {
    switch (config.system) {
        case "mysql":
            new Packages.com.mysql.jdbc.Driver;
            break;
        case "oracle":
            new Packages.oracle.jdbc.OracleDriver;
            break;
        default:
            throw "Database driver not supported";
    }

    return this;
}

/**
 * Prepare an SQL statement for execution. Placeholders (?) can be used in 
 * the statement to be interpolated when the compiled statement is executed.
 *
 * db.prepare("INSERT INTO Article (title, body) VALUES (?, ?)");
 */
Database.prototype.prepare = function(sql) {
    if (typeof(sql) == "string") {
        return this.conn.prepareStatement(sql);
    } else {
        return sql;
    }
}

/**
 * Execute an SQL statement with no results (INSERT, UPDATE, DELETE)
 * Returns the number of rows touched.
 *
 * db.execute(sql, param1, param2);
 */
Database.prototype.execute = Database.prototype.update = function(sql) {
    var stmt = this.prepare(sql);
    
    for (var i = 1; i < arguments.length; i++) {
        stmt.setString(i, arguments[i]);
    }    

    var rows = stmt.executeUpdate();

    return rows;
}

/**
 * Execute an SQL insert statement. This specialized execute method returns 
 * the last inserted id instead of the row count. Use the standard execute
 * method when you are interested in the row count.
 *
 * db.insert(sql, param1, param2);
 */
Database.prototype.insert = function(sql) {
    var stmt = this.prepare(sql);

    for (var i = 1; i < arguments.length; i++) {
        stmt.setString(i, arguments[i]); // 1-based index
    }

    var rs, rows = stmt.executeUpdate();
        
    if ((rows > 0) && (rs = stmt.getGeneratedKeys()) && (rs.next())) {
        var id = Number(rs.getInt(1));
        rs.close();
        return id;
    } else {
        return -1;
    }
}    

/**
 * Execute an SQL statement that generates results (SELECT).
 * Returns a Result object.
 *
 * db.query(sql, param1, param2, ..);
 */
Database.prototype.query = function(sql) {
    var stmt = this.prepare(sql);

    for (var i = 1; i < arguments.length; i++) {
        stmt.setString(i, arguments[i]); // 1-based index
    }

    var rs = stmt.executeQuery();
    var meta = rs.getMetaData();

    return new Result(rs, meta);
}

/**
 * Encapsulates a query result.
 */
var Result = function(rs, meta) {
    this.rs = rs;
    this.meta = meta;
}

/**
 * Read (deserialize) one object.
 */
Result.prototype.one = function(klass) {
    klass = klass || Object;

    var obj;
                
    if (this.rs.next()) {
        obj = new klass();
        for (var i = 1; i <= this.meta.getColumnCount(); i++)
            obj[String(this.meta.getColumnLabel(i))] = String(this.rs.getString(i));
    }

    this.rs.close();
    
    return obj;
}

/**
 * Read (deserialize) all objects.
 */
Result.prototype.all = function(klass) {
    klass = klass || Object;

    var objects = [];

    while (this.rs.next()) {
        var obj = new klass();
        for (var i = 1; i <= this.meta.getColumnCount(); i++)
            obj[String(this.meta.getColumnLabel(i))] = String(this.rs.getString(i));

        objects.push(obj);
    }
    
    this.rs.close();
    
    return objects;
}

/**
 * Iterate over the result, pass each deserialized object to the provided 
 * function.
 */
Result.prototype.forEach = function(func, klass) {
    klass = klass || Object;

    while (this.rs.next()) {
        var obj = new klass();
        for (var i = 1; i <= this.meta.getColumnCount(); i++)
            obj[String(this.meta.getColumnLabel(i))] = String(this.rs.getString(i));

        func(obj);
    }
    
    this.rs.close();
}

/**
 * Close the underlying resultset.
 */
Result.prototype.close = function() {
    this.rs.close();
}

