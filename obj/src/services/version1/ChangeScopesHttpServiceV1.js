"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class ChangeScopesHttpServiceV1 extends pip_services_net_node_1.CommandableHttpService {
    constructor() {
        super('change_scopes');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-changescopes', 'controller', 'default', '*', '1.0'));
    }
}
exports.ChangeScopesHttpServiceV1 = ChangeScopesHttpServiceV1;
//# sourceMappingURL=ChangeScopesHttpServiceV1.js.map