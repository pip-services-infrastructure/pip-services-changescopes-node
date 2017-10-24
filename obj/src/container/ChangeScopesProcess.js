"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const ChangeScopesServiceFactory_1 = require("../build/ChangeScopesServiceFactory");
class ChangeScopesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("change_scopes", "Change scopes microservice");
        this._factories.add(new ChangeScopesServiceFactory_1.ChangeScopesServiceFactory);
    }
}
exports.ChangeScopesProcess = ChangeScopesProcess;
//# sourceMappingURL=ChangeScopesProcess.js.map