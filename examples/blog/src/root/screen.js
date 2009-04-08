
// Dynamic generation of the css from a template in src/screen.css
// Mainly to demonstrate what is possible.

exports.GET = function(env) {
    if (env["CONTENT_TYPE"] == "text/css")
        return [200, { "Cache-Control": "public; max-age=8640000" }, {
            gray: "#eee"        
        }];
}

