// THINK: implement as middleware?


// Update (or add) a query string parameter.
var updateParam = function(uri, key, val) {
    var param = key + "=" + val;
    
    if (uri.match(/\?/)) { 
        var u = uri.replace(new RegExp(key + "=([^&|^;]*)"), param); 
        if (u !== uri) return u;
    }

    return uri + "?" + param;
}

/** The paginator offset parameter in the query string. */
var PKEY = "po";

/**
 * A simple pagination helper. Calculates the sql limit clause. 
 *
 * COUNT(*) is avoided for scalability reasons.
 * We check if the collection has limit+1 objects (show prev then).
 * http://www.mysqlperformanceblog.com/2008/09/24/four-ways-to-optimize-paginated-displays/
 *
 * Example:
 * var app = function(request, response) {
 *     var pg = new Paginator(request, 10);
 *     var articles = $db.query("SELECT * FROM Article " + pg.sqlLimit()).all(Article);
 *     response.setData({
 *         articles: articles,
 *         paginator: pg.paginate(articles)
 *     });
 * }
 */
var Paginator = exports.Paginator = function(request, limit) {
    this.request = request;
    this.params = request.params();
    this.offset = parseInt(this.params[PKEY] || 0, 10);
    this.limit = limit || 10;
}

/**
 * Construct the SQL LIMIT clause.
 * limit+1 records are fetched to check if we should display the previous link.
 */
Paginator.prototype.sqlLimit = function(limit) {
    if (limit) this.limit = limit;
    return "LIMIT " + (this.limit+1) + " OFFSET " + this.offset;
}

/**
 * Perform pagination. Calculate next/prev uris.
 */
Paginator.prototype.paginate = function(objects, uri) {
    var uri = uri || this.request.relativeURI();
    
    if (0 != this.offset)
        this.next = updateParam(uri, PKEY, this.offset-this.limit);
    else
        this.next = null;

    if (objects.length > this.limit)
        this.prev = updateParam(uri, PKEY, this.offset+this.limit);
    else
        this.prev = null;    
        
    return this;
}
