exports.testTemplate = require("./template-tests");

if (require.main === module.id)
    require("os").exit(require("test/runner").run(exports));
