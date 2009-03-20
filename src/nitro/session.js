/**
 * Session variables live throughout a user's session.
 *
 * HTTP is a stateless protocol for a *good* reason. Try to avoid using 
 * session variables.
 */
var Session = exports.Session = function() {
    this.vars = {};
    this.dirty = false;
};

/**
 * Get a variable from the session, returns the default value passed if the
 * variable does not exist.
 */
Session.prototype.get = function(key, defaultValue) {
    return this.vars[key] || defaultValue;    
}

/**
 * Set a session variable to the given value.
 */
Session.prototype.put = function(key, value) {
    this.vars[key] = value;
    this.dirty = true;
}

/**
 * Remove a session variable.
 */
Session.prototype.remove = function(key) {
    delete this.vars[key];
    this.dirty = true;
}
  
/**
 * Optimize the session object for serialization by removing empty keys and 
 * transient data.
 */
Session.prototype.pack = function() {
}

