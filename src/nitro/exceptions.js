exports.SeeOther = function(uri) {
    this.status = 303;
    this.headers = { Location: uri };
    this.body = 'Go to <a href="' + uri + '">' + uri + '</a>';
}

exports.NotModified = function(uri) {
    this.status = 304;
}

exports.NotFound = function(msg) {
    this.status = 404;
    this.body = msg || "Not found";
}

