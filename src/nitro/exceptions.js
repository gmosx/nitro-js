
exports.SeeOther = function(location) {
    return [303, { "Location": location }, 'Go to <a href="' + location + '">' + location + '</a>'];
}

exports.NotModified = function() {
    return [304, {}, ""];
}

exports.NotFound = function(msg) {
    return [404, {}, msg || "Not found"];
}
