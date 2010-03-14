var escapeHTML = require("html").escape;

/**
 * Atom codec.
 * TODO: Implement with E4X?
 */

// Serialize a single object.
var encodeObject = function(obj, options) {
	return '\
<entry>\n\
	<title>' + obj.title + '</title>\n\
	<link href="' + options.base + "/" + obj.path() + '"/>\n\
	<id>' + obj.key() + '</id>\n\
	<published>' + obj.created.toISOString() + '</published>\n\
	<updated>' + obj.created.toISOString() + '</updated>\n\
	<content type="html">' + escapeHTML(obj.content) + '</content>\n\
</entry>';
}

/**
 * Serialize an object or (typically) a collection of objects to an Atom string.
 */
exports.encode = function(obj, options) {
	if (Array.isArray(obj)) {
		var feed = '\
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en" xml:base="' + options.base + '">\n\
	<id>' + options.self + '</id>\n\
	<title>' + options.title + '</title>\n\
	<updated>' + options.updated.toISOString() + '</updated>\n\
	<link href="' + options.base + '" />\n\
	<link rel="self" href="' + options.self + '" />\n';
		  
  		for (var i = 0; i < obj.length; i++) {
  			feed += encodeObject(obj[i], options); 
  		}
  
		feed += '\
</feed>';
		return feed;
	} else {
		return encodeObject(obj, options);
	}
}

/**
 * Deserialize an object from an Atom string.
 */
exports.decode = function(str) {
}

