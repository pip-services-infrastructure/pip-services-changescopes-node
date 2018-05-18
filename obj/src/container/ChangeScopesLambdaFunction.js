"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const ChangeScopesServiceFactory_1 = require("../build/ChangeScopesServiceFactory");
class ChangeScopesLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("change_scopes", "Change scopes function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-changescopes', 'controller', 'default', '*', '*'));
        this._factories.add(new ChangeScopesServiceFactory_1.ChangeScopesServiceFactory());
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.ChangeScopesLambdaFunction = ChangeScopesLambdaFunction;
exports.handler = new ChangeScopesLambdaFunction().getHandler();
//# sourceMappingURL=ChangeScopesLambdaFunction.js.map