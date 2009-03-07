#!/usr/bin/java org.mozilla.javascript.tools.shell.Main

$DEBUG = true;

$LOAD_PATH = "src:lib:../jack/lib"; 

load("../jack/core.js");

require("lang/object");

var ids = 0;

// Example ancestor.
var Identity = function(name) {
    this.id = ids++;
    this.name = name
}

Identity.prototype.dump = function() {
    return this.id + " : " + this.name;
}

// Example mixin as hash.
var Validation = {};
Validation.validate = function() {
    return true;
}

// Example mixin as function (not really useful)
var Timestamped = function(when) {
    this.when = when;
}
Timestamped.prototype.created = function() {
    return "created at " + this.when;
}

// Example class.
var User = Object.extend(Identity, function(name, email) {
    Identity.call(this, name);
    Timestamped.call(this, new Date());
    this.email = email;
});

User.include(Validation, Timestamped);

User.prototype.toString = function() {
    return this.dump() + " // " + this.email;
}

var user = new User("gmosx", "george-moschovitis@gmail.com");

print(user.dump());
print(user);
print(user.validate());
print(user.created());
