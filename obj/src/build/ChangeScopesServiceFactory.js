"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ChangeScopesMongoDbPersistence_1 = require("../persistence/ChangeScopesMongoDbPersistence");
const ChangeScopesFilePersistence_1 = require("../persistence/ChangeScopesFilePersistence");
const ChangeScopesMemoryPersistence_1 = require("../persistence/ChangeScopesMemoryPersistence");
const ChangeScopesController_1 = require("../logic/ChangeScopesController");
const ChangeScopesHttpServiceV1_1 = require("../services/version1/ChangeScopesHttpServiceV1");
const ChangeScopesSenecaServiceV1_1 = require("../services/version1/ChangeScopesSenecaServiceV1");
class ChangeScopesServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ChangeScopesServiceFactory.MemoryPersistenceDescriptor, ChangeScopesMemoryPersistence_1.ChangeScopesMemoryPersistence);
        this.registerAsType(ChangeScopesServiceFactory.FilePersistenceDescriptor, ChangeScopesFilePersistence_1.ChangeScopesFilePersistence);
        this.registerAsType(ChangeScopesServiceFactory.MongoDbPersistenceDescriptor, ChangeScopesMongoDbPersistence_1.ChangeScopesMongoDbPersistence);
        this.registerAsType(ChangeScopesServiceFactory.ControllerDescriptor, ChangeScopesController_1.ChangeScopesController);
        this.registerAsType(ChangeScopesServiceFactory.SenecaServiceDescriptor, ChangeScopesSenecaServiceV1_1.ChangeScopesSenecaServiceV1);
        this.registerAsType(ChangeScopesServiceFactory.HttpServiceDescriptor, ChangeScopesHttpServiceV1_1.ChangeScopesHttpServiceV1);
    }
}
ChangeScopesServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-ChangeScopes", "factory", "default", "default", "1.0");
ChangeScopesServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-changescopes", "persistence", "memory", "*", "1.0");
ChangeScopesServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-changescopes", "persistence", "file", "*", "1.0");
ChangeScopesServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-changescopes", "persistence", "mongodb", "*", "1.0");
ChangeScopesServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-changescopes", "controller", "default", "*", "1.0");
ChangeScopesServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-changescopes", "service", "seneca", "*", "1.0");
ChangeScopesServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-changescopes", "service", "http", "*", "1.0");
exports.ChangeScopesServiceFactory = ChangeScopesServiceFactory;
//# sourceMappingURL=ChangeScopesServiceFactory.js.map