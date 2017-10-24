"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_data_node_1 = require("pip-services-data-node");
const ChangeScopesMemoryPersistence_1 = require("./ChangeScopesMemoryPersistence");
class ChangeScopesFilePersistence extends ChangeScopesMemoryPersistence_1.ChangeScopesMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services_data_node_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.ChangeScopesFilePersistence = ChangeScopesFilePersistence;
//# sourceMappingURL=ChangeScopesFilePersistence.js.map