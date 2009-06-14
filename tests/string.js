load("test.js");

load("../lib/lang/string.js");

var StringTestSuite = {

    test_startsWith: function() {
        var s = "Hello";
        assertTrue(s.startsWith("H"));
    },
    
    test_endsWith: function() {
        var s = "Hello";
        assertTrue(s.endsWith("o"));
    },

    test_escapeHTML: function() {
        var html = '<p class="text">hello</p>';
        assertEqual(html.escapeHTML(), '&lt;p class="text"&gt;hello&lt;/p&gt;');
    }
        
}

jsUnity.run(StringTestSuite);
