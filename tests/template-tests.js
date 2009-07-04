var assert = require("test/assert");

var Template = require("template").Template;

exports.testWithSingle = function() {
    var t = new Template("{.with user}Hello {name}!{.end}");
    var data = { user: { name: "George" } };
    assert.isEqual("Hello George!", t.render(data));
}

exports.testIgnoreNumericInterpolator = function() {
    var t = new Template("Hello {0} {name}!");
    var data = { name: "George" };
    assert.isEqual("Hello {0} George!", t.render(data));
}

exports.testBrokenInterpolator = function() {
    var t = new Template("Hello {name is broken} {name}!");
    var data = { name: "George" };
    assert.isEqual("Hello {name is broken} George!", t.render(data));
}
