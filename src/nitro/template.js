var JSTemplate = require("text/template/jst").Template;

var cache = {};

var Template = exports.Template = function() {};

Template.load = function(path) {
    if (t = cache[path]) {
        return t;
    } else {
        var src = readFile(path);
        var t = new JSTemplate(src);
        cache[path] = t;
        return t;
    }
}

