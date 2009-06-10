var Tag = require("app/content/tag").Tag;

exports.GET = function(env) {
    var db = openDatabase();
    var params = env.request.params();

    var like = params.q + "%";
    var tags = db.query("SELECT name FROM Tag WHERE name LIKE ? ORDER BY COUNT DESC LIMIT 100", like).all(Tag);

    res = [];
    for (var i in tags)
        res.push(tags[i].name);
        
    return [200, {}, [res.join("\n")]];
}
