var assert = require("test/assert");

var Session = require("nitro/session").Session;

var env = { "jsgi.session.load": function(env) {return {}} };

exports.testDirty = function() {
    var session = new Session(env);
    assert.isFalse(session.dirty);
    session.put("val", 1);
    assert.isTrue(session.dirty);
}
