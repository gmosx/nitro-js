/**
 * Session variables live throughout a user's session.
 *
 * HTTP is a stateless protocol for a *good* reason. Try to avoid using 
 * session variables. 
 *
 * The framework explicitly makes session manipulation 'painful' to discourage 
 * users from using them.
 */
var Session = exports.Session = function(env) {
    if (env["jack.session"])
        return env["jack.session"];

    this.data = env["jack.session.load"](env);
    this.dirty = false;

    env["jack.session"] = this;
}

/**
 * Get a variable from the session.
 */
Session.prototype.get = function(key) {
    return this.data[key];    
}

/**
 * Set a session variable to the given value.
 */
Session.prototype.put = function(key, value) {
    this.data[key] = value;
    this.dirty = true;
}

/**
 * Remove a session variable.
 */
Session.prototype.remove = function(key) {
    delete this.data[key];
    this.dirty = true;
}

