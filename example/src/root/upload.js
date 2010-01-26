var Request = require("nitro/request").Request;

exports.GET = function(env) {
    return {data: {}};
}

exports.POST = function(env) {
    var params = new Request(env).params();

    return {
        status: 200, 
        headers: {
            "Content-Type": params.file.type
        },
        body: [system.fs.read(params.file.tempfile, "b")]
    };  
}
