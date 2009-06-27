var assert = require("test/assert");

var Template = require("template").Template;

exports.testWithSingle = function() {
    var t = new Template("{.with user}Hello {name}!{.end}");
    var data = { user: { name: "George" } };
    assert.isEqual("Hello George!", t.render(data));
}
