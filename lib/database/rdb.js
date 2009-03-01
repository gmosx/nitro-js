// Powered by JDBC.

var JClass = Packages.java.lang.Class;
    JDriverManager = Packages.java.sql.DriverManager;

JClass.forName("com.mysql.jdbc.Driver").newInstance();

/**
 * A relational database interface.
 *
 * See test/database/rdb.js for example usage.
 */
var Database = exports.Database = function(connectURI) {

    // Encapsulates a query result.
    var Result = function(rs, meta) {
    
        this.one = function(klass) {
            klass = klass || Object;

            var obj;
                        
            if (rs.next()) {
                obj = new klass();
                for (var i = 1; i <= meta.getColumnCount(); i++)
                    obj[String(meta.getColumnLabel(i))] = String(rs.getString(i));
            }

            rs.close();
            
            return obj;
        }
        
        this.all = function(klass) {
            klass = klass || Object;

            var objects = [];

            while (rs.next()) {
                var obj = new klass();
                for (var i = 1; i <= meta.getColumnCount(); i++)
                    obj[String(meta.getColumnLabel(i))] = String(rs.getString(i));

                objects.push(obj);
            }
            
            rs.close();
            
            return objects;
        }
    
        this.each = this.forEach = function(func, klass) {
            klass = klass || Object;

            while (rs.next()) {
                var obj = new klass();
                for (var i = 1; i <= meta.getColumnCount(); i++)
                    obj[String(meta.getColumnLabel(i))] = String(rs.getString(i));

                func(obj);
            }
            
            rs.close();
        }
        
        this.close = function() {
            rs.close();
        }
    
    }

    var conn = JDriverManager.getConnection(connectURI);

    /**
     * Prepare an SQL statement for execution. Placeholders (?) can be used in 
     * the statement to be interpolated when the compiled statement is executed.
     *
     * $db.prepare("INSERT INTO Article (title, body) VALUES (?, ?)");
     */
    this.prepare = function(sql) {
        if (typeof(sql) == "string") {
            return conn.prepareStatement(sql);
        } else {
            return sql;
        }
    }

    /**
     * Execute an SQL statement with no results (INSERT, UPDATE, DELETE)
     * Returns the number of rows touched.
     *
     * $db.execute(sql, param1, param2);
     */
    this.execute = this.update = function(sql) {
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
     * $db.insert(sql, param1, param2);
     */
    this.insert = function(sql) {
        var stmt = this.prepare(sql);

        for (var i = 1; i < arguments.length; i++) {
            stmt.setString(i, arguments[i]); // 1-based index
        }
    
        var res, rows = stmt.executeUpdate();
        
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
     * $db.query(sql, param1, param2, ..);
     */
    this.query = function(sql) {
        var stmt = this.prepare(sql);

        for (var i = 1; i < arguments.length; i++) {
            stmt.setString(i, arguments[i]); // 1-based index
        }

        var rs = stmt.executeQuery();
        var meta = rs.getMetaData();

        return new Result(rs, meta);
    }
         
};

