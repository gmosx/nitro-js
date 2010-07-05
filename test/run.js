exports.testDispatch = require("./nitro/middleware/dispatch");

if (module === require.main) {
    require("test").run(exports);
}    
