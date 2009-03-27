var Tag = require("blog/tag").Tag;

exports.txt = function(request, response) {
    var params = request.params();
    var like = params.q + "%";
    
    var tags = $db.query("SELECT name FROM Tag WHERE name LIKE ? ORDER BY COUNT DESC LIMIT 100", like).all(Tag);

    res = [];
    for (var i in tags)
        res.push(tags[i].name);
        
    response.write(res.join("\n"));
}
