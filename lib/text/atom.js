require("lang/date");
require("lang/string");

/**
 * Atom codec.
 * TODO: Implement with E4X?
 */
var Atom = exports.Atom = {};

// Format a date object.
var fmtdate = function(date) {
    Date.fromSQLString(date).toISOString()
}

// Serialize a single object.
var encodeObject = function(obj, options) {
	return '\
<entry>\n\
	<title>' + obj.title + '</title>\n\
	<link href="' + options.base + "/" + obj.path() + '"/>\n\
	<id>' + obj.id + '</id>\n\
	<published>' + fmtdate(obj.created) + '</published>\n\
	<updated>' + fmtdate(obj.created) + '</updated>\n\
	<content type="html">' + String.escapeHTML(obj.content) + '</content>\n\
</entry>';
}

/**
 * Serialize an object or (typically) a collection of objects to an Atom string.
 */
Atom.encode = function(obj, options) {
	if (isArray(obj)) {
		var feed = '\
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en" xml:base="' + options.base + '">\n\
	<id>' + options.self + '</id>\n\
	<title>' + options.title + '</title>\n\
	<updated>' + fmtdate(options.updated) + '</updated>\n\
	<link href="' + options.base + '/blog" />\n\
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
Atom.decode = function(str) {
}

