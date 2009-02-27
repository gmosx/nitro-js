// FIXME: Implement me. 
// FIXME: Move to a better dir.

var Path = exports.Path = {};

Path.join = function(part1, part2) {
    return part1 + "/" + part2;
}

Path.split = function(path) {
}

Path.file = function(path) {
}

Path.directory = Path.dir = function(path) {
    return "";
}

Path.extension = Path.ext = function(path) {
    return path.split(".");
}

