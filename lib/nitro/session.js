try {
    exports.Session = require("ringo/webapp/request").Session;
} catch (e) {
    exports.Session = require("jack/session").Session;
}

