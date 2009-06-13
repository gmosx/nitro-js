var Gravatar = require("../users/gravatar").Gravatar;

var VALID_EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

/**
 * An unclaimed comment.
 *
 * authorName
 * authorEmail
 * authorURI
 * content
 * created
 * parentId
 */
var Comment = exports.Comment = Object.type(function() {});

Comment.include(Gravatar);

Comment.prototype.authorLink = function() {
    return '<a href="' + this.uri + '" rel="nofollow">' + this.name + '</a>';
}

Comment.validate = function(obj) {
    var errors = {};
    
    if ((!obj.authorName) || (obj.name.length < 3)) {
        errors.authorName = "Invalid author name";
    }
    
	if (!VALID_EMAIL_RE.test(obj.authorEmail)) {
		errors.authorEmail = "Invalid author email";
	} 
	
	return errors;
}
