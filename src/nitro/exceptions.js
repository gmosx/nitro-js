
exports.SeeOther = function(uri) {
    return [303, { Location: uri }, 'Go to <a href="' + uri + '">' + uri + '</a>'];
}

exports.NotFound = function(env) {
    return [404, {}, "Not found"];
}

/*
var SeeOther = require("nitro/exceptions").SeeOther;
return SeeOther("/register");
throw SeeOther("/register");
*/
