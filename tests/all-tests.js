exports.testSession = require("./nitro/dispatch");

if (require.main === module.id)
    require("os").exit(require("test/runner").run(exports));
