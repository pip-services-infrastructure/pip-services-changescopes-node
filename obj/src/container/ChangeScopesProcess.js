"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const ChangeScopesServiceFactory_1 = require("../build/ChangeScopesServiceFactory");
class ChangeScopesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("change_scopes", "Change scopes microservice");
        this._factories.add(new ChangeScopesServiceFactory_1.ChangeScopesServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.ChangeScopesProcess = ChangeScopesProcess;
//# sourceMappingURL=ChangeScopesProcess.js.map