"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_data_node_1 = require("pip-services-data-node");
const ChangeScopeV1_1 = require("../data/version1/ChangeScopeV1");
class ChangeScopesMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    change(correlationId, id, callback) {
        let index = this._items.map((x) => { return x.id; }).indexOf(id);
        let item = index >= 0
            ? this._items[index] : new ChangeScopeV1_1.ChangeScopeV1(id);
        // Update time
        item.change_time = new Date();
        if (index < 0)
            this._items.push(item);
        this._logger.trace(correlationId, "Updated item by %s", id);
        this.save(correlationId, (err) => {
            if (callback)
                callback(err, item);
        });
    }
    changeElement(correlationId, id, element, callback) {
        let index = this._items.map((x) => { return x.id; }).indexOf(id);
        let item = index >= 0
            ? this._items[index] : new ChangeScopeV1_1.ChangeScopeV1(id);
        // Update time
        let now = new Date();
        item.change_time = now;
        // Update element
        item.elements = item.elements || {};
        item.elements[element] = now;
        if (index < 0)
            this._items.push(item);
        this._logger.trace(correlationId, "Updated item by %s", id);
        this.save(correlationId, (err) => {
            if (callback)
                callback(err, item);
        });
    }
}
exports.ChangeScopesMemoryPersistence = ChangeScopesMemoryPersistence;
//# sourceMappingURL=ChangeScopesMemoryPersistence.js.map