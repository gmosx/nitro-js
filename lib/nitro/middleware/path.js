var MIME_TYPES = require("jack/mime").MIME_TYPES;

var FS = require("fs");

// Custom version of listTree that avoids .isLink()
var listTree = function (path) {
    var paths = [""];
    
    FS.path(path).list(path).forEach(function (child) {
        var fullPath = FS.join(path, child);
        if (FS.isDirectory(fullPath)) {
            paths.push.apply(paths, listTree(fullPath).map(function(p) {
                return FS.join(child, p);
            }));
        } else {
            paths.push(child)
        }
    });
    
    return paths;
};

// Compute a hash of all the scripts in dispatchRoot.
var computeSitemap = function (root) {
    var sitemap = {};
    
    listTree(root).forEach(function (f) {
        if (f.match(/\.js$/)) {
            sitemap["/" + f.replace(/\.js$/, "")] = true;
        }
    });

    return sitemap;
}

/**
 * Normalize the request path, extract scriptName, pathInfo, pathTranslated.
 *
 * .scriptName: The initial portion of the request URL's "path" that corresponds 
 * to the Application object, so that the  Application knows its virtual 
 * "location". This MAY be an empty string, if the Application corresponds to 
 * the "root" of the Server. Restriction: if non-empty `scriptName` MUST start 
 * with "/", MUST NOT end with "/" and MUST NOT be decoded.
 *
 * .pathInfo: The remainder of the request URL's "path", designating the virtual 
 * "location" of the Request's target within the Application. This may be an 
 * empty string, if the request URL targets the Application root and does not 
 * have a trailing slash. Restriction: if non-empty `pathInfo` MUST start with 
 * "/" and MUST NOT be decoded.
 */
exports.Path = exports.middleware = function (app, options) {
    options = options || {};
    
    if (options.sitemap) {
        var sitemap = options.sitemap;
    } else {
        var sitemap = computeSitemap(options.scriptRoot || "WEB-INF/src/root");
    }

    return function (env) {
        var scriptName = env.pathInfo; // no need for shallow copy.

        var ext = ".html";
        
        if (scriptName == "/") { // handle /
            scriptName = "/index";
            env.contentType = "text/html";
        } else {
            if (/\/$/.test(scriptName)) { // remove trailing / -> text/html
                env.pathInfo = scriptName.replace(/\/$/, "");   
                env.contentType = "text/html";
            } else {
                var idx = scriptName.lastIndexOf("."),
                    ext = scriptName.slice(idx),
                    mime = MIME_TYPES[ext];
                if (mime) { // uri contains valid mime type.
                    env.contentType = mime
                    env.pathInfo = scriptName = scriptName.slice(0, idx);   
                } else { // set default mime type.
                    ext = ".html";
                    env.contentType = "text/html";
                }
            }            
        }

        // TODO: add dispatchRoot as prefix.
        env.pathTranslated = env.scriptName + env.pathInfo + ext;

        idx = 99999;

        while (!sitemap[scriptName]) {
            idx = scriptName.lastIndexOf("/");
            if (idx == 0) {
                return {
                    status: 404,
                    headers: {},
                    body: []
                }
// no '/'-based nice urls!
//              scriptName = "/index";
//              break;
            }
            scriptName = scriptName.slice(0, idx);
        }
        
        env.pathInfo = env.pathInfo.slice(idx);
        env.scriptName = scriptName;
 
        return app(env);
    }
}
