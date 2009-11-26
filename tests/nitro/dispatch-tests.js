var assert = require("test/assert");

var DISPATCH = require("nitro/dispatch"),
    realPath = DISPATCH.realPath;

exports.testRealPath = function() {
    var sitemap = {
        "/index": {title: "Home"},
        "/blog": {title: "Blog"},
        "/blog/article": {title: "Article"}
    }
    
    var env = { "PATH_INFO": "/index.html" }
    assert.isEqual("/index", realPath(env, sitemap));
    assert.isEqual(undefined, env.args);

    var env = { "PATH_INFO": "/blog/2312342/this-is-a-nice-article" }
    assert.isEqual("/blog", realPath(env, sitemap));
    assert.isEqual(2, env.args.length);
    assert.isEqual("2312342", env.args[0]);
    assert.isEqual("this-is-a-nice-article", env.args[1]);

    var env = { "PATH_INFO": "/not/in/map.html" }
    assert.isEqual("/not/in/map", realPath(env, sitemap));
}

