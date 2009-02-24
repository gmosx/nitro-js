var File = require("io/file").File;

var FileCache = exports.FileCache = function(loader) {
    this.cache = {}; // FIXME: convert to LRU Cache!
    this.loader = loader;
};

FileCache.prototype.get = function(path) {
    var lm = File.lastModified(path);
    
    if (0 != lm) { // lm == 0 if the file does not exist.
        var key = path + lm;
        if (!this.cache[key]) this.cache[key] = this.loader(path);
        return this.cache[key];
    }
}
