
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
var Comment = exports.Comment = function() {
};

Comment.validate = function(obj) {
    var errors = {}
    
    if ((!obj.authorName) || (obj.name.length < 3)) {
        errors.authorName = "Invalid author name";
    }
    
	if (!VALID_EMAIL_RE.test(obj.authorEmail)) {
		errors.authorEmail = "Invalid author email";
	} 
	
	return errors;
}
