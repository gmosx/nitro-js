var JSTemplate = require("text/template/jst").Template;

var FileCache = require("nitro/utils/filecache").FileCache;

var cache = new FileCache(function(path) {
    var src = readFile(path);
    return new JSTemplate(src);
});

var Template = exports.Template = function() {};

Template.load = function(path) {
    return cache.get(path);
}

Template.render = function(path, args) {
    return Template.load(path).render(args);
}
