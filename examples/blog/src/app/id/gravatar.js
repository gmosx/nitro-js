var md5 = require("data/digest/md5").MD5.hexdigest;

/**
 * A gravatar, or globally recognized avatar, is quite simply an avatar 
 * image that follows you from weblog to weblog appearing beside your 
 * name when you comment on gravatar enabled sites. Avatars help 
 * identify your posts on web forums, so why not on weblogs?
 *
 * http://www.gravatar.com
 */
var Gravatar = exports.Gravatar = function() {};

/**
 * Generate the gravatar uri.
 * Examples: 
 *   "http://gravatar.com/e9e719b44653a9300e1567f09f6b2e9e.png?r=PG&s=512"
 *   "https://secure.gravatar.com/e9e719b44653a9300e1567f09f6b2e9e.png?r=PG"
 */
Gravatar.uri = function(email, extra, prefix) {
    if (!email) return "";
    return "http://gravatar.com/avatar/" + md5(email) + ".png" + (extra || "");
}

Gravatar.prototype.gravatarURI = function() {
    return Gravatar.uri(this.email);
}

Gravatar.prototype.gravatarURI_small = function() {
    return Gravatar.uri(this.email, "?s=32");
}
