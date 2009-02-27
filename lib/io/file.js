var JFile = Packages.java.io.File;
    
var File = exports.File = function() {};

/**
 * Return the 'last modified' time of the given file.
 */
File.lastModified = function(path) {
	return (new JFile(path)).lastModified();
}

// TODO: move to separate file.
