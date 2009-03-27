
/**
 * A content category
 */
var Category = exports.Category = function() {
}

Category.prototype.toString = function() {
    return this.label;
}

Category.prototype.path = function() {
    return "*" + this.id + "/" + this.label;
}
