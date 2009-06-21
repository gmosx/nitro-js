// TODO: Reimplement this.

// Escape HTML characters.
String.prototype.escapeHTML = function () {
	return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// Strip HTML tags.
String.prototype.stripTags = function () {
	return this.replace(/<([^>]+)>/g, "");
}

/**
 * Escape HTML characters.
 * THINK: implemented as function (instead of method), more failsafe.
 */
String.escapeHTML = function(str) {
    if (str)
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");   
    else    
        return "";
}
