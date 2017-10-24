let ChangeScopesProcess = require('../obj/src/container/ChangeScopesProcess').ChangeScopesProcess;

try {
    new ChangeScopesProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
