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

/*
exports.app = function(env) {
    return { name: "George", time: new Date() };
}

exports.app = function(env) {
    var args = { name: "George", time: new Date() };
    return new Response().setArgs(args).finish();

    return Response.model({ 
        name: "George", 
        time: new Date() 
    });
}

exports.app = function(env) {
    return new Response.sendRedirect("/register").finish();

    return Reponse.redirect("/register");
}

exports.app = function(env) {
    return new Response("hello world").finish();
}

exports.app = function(request, response) {
    response.redirect("/register");
    throw Response.Redirect("/register");
}



exports.app = function(request, response) {
    var response = new Response();
    response.setData({
        name: "George",
        time: new Date()
    });
    return response.finish();
    
    return Response.sendData({ name: "George", time: new Date() });
}
*/
