try {
    exports.Request = require("ringo/webapp/request").Request;
} catch (e) {
    exports.Request = require("jack/request").Request;
}
