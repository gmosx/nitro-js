var SHA256 = require("data/digest/sha256").SHA256,
    JSON = require("codec/json").JSON,
    Base64 = require("codec/mime/base64").Base64,
    Session = require("nitro/session").Session,
    Request = require("nitro/request").Request;

/**
 * Session management.
 *
 * The HTTP protocol is stateless, for a *good* reason. State data (session) 
 * should be kept to an absolute minimum.
 *
 * This Session Manager implementation stores session data in the session cookie
 * data. A maximum of arround 4Kb of state is supported.
 * THINK: http://wonko.com/post/why-you-probably-shouldnt-use-cookies-to-store-session-data
 *
 * The session is lazily loaded (deserialized) the first time request.session is
 * accessed.
 */
var SessionManager = exports.SessionManager = function(app, secret, cookieName) {

    if (undefined === secret) throw "Please define the SessionManager secret value!";
    cookieName = cookieName || "ns";

    // Deserialize the session from the session cookie. Lazily called from
    // request.session()
    var loadSession = function(env) {
        var cookie, request = new Request(env);

        var session = new Session();
        
        if (cookie = request.cookies()[cookieName]) {
            var parts = decodeURIComponent(cookie).split("--");        
            var data = parts[0], hash = parts[1];
                
            if (hash == SHA256(data + secret)) {
                session.vars = JSON.decode(Base64.decode(data));
            }
        } 
        
        return session;
    }

    // Deserialize the session to the session cookie.
    // WARN: Keep the argument order to force response rendering before session 
    // extraction.
    var saveSession = function(response, session) {
        if (session && session.dirty) {
            var data = Base64.encode(JSON.encode(session.vars));
            var hash = SHA256(data + secret);

            var date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            
            response.setCookie(cookieName, {
                path: "/",
                value: data + "--" + hash,
                expires: date,
                httpOnly: true
            });
        }
    }
      
    return function(request, response) {
        // Store a ref to the SessionManager in the environment to be used upstream
        // if needed.        
        request.env["NITRO_SESSION_LOADER"] = loadSession;

        // WARN: First calculate the response, then extract the session.
        app(request, response); 
        saveSession(response, request.env["NITRO_SESSION"]);
    }

}


