exports.GET = function(env) {
    if (env["CONTENT_TYPE"] == "text/css") {
        return [
            200, 
            { "Cache-Control": "public; max-age=8640000" }, 
            {
                gray: "#eee"        
            }
        ];
    }
}

