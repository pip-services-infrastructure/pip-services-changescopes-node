"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const ChangeScopesMemoryPersistence_1 = require("../persistence/ChangeScopesMemoryPersistence");
const ChangeScopesFilePersistence_1 = require("../persistence/ChangeScopesFilePersistence");
const ChangeScopesMongoDbPersistence_1 = require("../persistence/ChangeScopesMongoDbPersistence");
const ChangeScopesController_1 = require("../logic/ChangeScopesController");
const ChangeScopesSenecaServiceV1_1 = require("../services/version1/ChangeScopesSenecaServiceV1");
class ChangeScopesSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-changescopes', seneca, ChangeScopesSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new ChangeScopesController_1.ChangeScopesController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new ChangeScopesMongoDbPersistence_1.ChangeScopesMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new ChangeScopesFilePersistence_1.ChangeScopesFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new ChangeScopesMemoryPersistence_1.ChangeScopesMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new ChangeScopesSenecaServiceV1_1.ChangeScopesSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-changescopes', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-changescopes', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-changescopes', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.ChangeScopesSenecaPlugin = ChangeScopesSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new ChangeScopesSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=ChangeScopesSenecaPlugin.js.map