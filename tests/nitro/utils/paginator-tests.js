var assert = require("test/assert");

var paginator = require("nitro/utils/paginator"),
    updateParam = paginator.updateParam;

exports.testUpdateParams = function() {
    var uri = 'http://www.site.com';
    assert.isEqual(updateParam(uri, "key", "5"), 'http://www.site.com?key=5');
    var uri = 'http://www.site.com?key=4';
    assert.isEqual(updateParam(uri, "key", "5"), 'http://www.site.com?key=5');
    var uri = 'http://www.site.com?name=1';
    assert.isEqual(updateParam(uri, "key", "5"), 'http://www.site.com?name=1&key=5');
    var uri = 'http://www.site.com?name=1&key=4';
    assert.isEqual(updateParam(uri, "key", "5"), 'http://www.site.com?name=1&key=5');
}

