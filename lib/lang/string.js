// @fileoverview Extend standard String objects.

// Convert the string to an integer.
String.prototype.toInt = function(base) {
    return parseInt(this, base || 10);
}

// Convert the string to a float.
String.prototype.toFloat = function() {
	return parseFloat(this);
}

// Trims leading and trailing whitespace from a string.
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
}; 

// Check if the string starts with the given prefix string.
String.prototype.startsWith = function(str) {
    return this.indexOf(str) === 0;
}

// Check if the string ends with the given postfix string.
String.prototype.endsWith = function(str) {
    var offset = this.length - str.length;
    return offset >= 0 && this.lastIndexOf(str) === offset;
}

// Trim the string, left/right.
//
// Faster version: http://blog.stevenlevithan.com/archives/faster-trim-javascript
//
// function trim (str) {
// var str = str.replace(/^\s\s*/, ''),
// ws = /\s/,
// i = str.length;
// while (ws.test(str.charAt(--i)));
// return str.slice(0, i + 1);
// }
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
}

//Trim the string, left.
String.prototype.ltrim = function() {
	return this.replace(/^\s+/g, "");
}

// Trim the string, right.
String.prototype.rtrim = function() {
	return this.replace(/\s+$/g, "");
}

// Escape HTML characters.
String.prototype.escapeHTML = function () {
	return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// Strip HTML tags.
String.prototype.stripTags = function () {
	return this.replace(/<([^>]+)>/g, "");
}
