exports.app = function(request, response) {
    var session = request.session();
    var count = session.get("count", 0) + 1;
    session.put("count", count);
    
    response.setData({
        name: "George",
        time: new Date(),
        count: count
    });
}

exports.atom = function(request, response) {
    response.write("This is an Atom response");
}

