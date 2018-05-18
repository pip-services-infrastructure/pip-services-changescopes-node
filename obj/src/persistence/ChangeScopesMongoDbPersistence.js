"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_oss_node_1 = require("pip-services-oss-node");
const ChangeScopesMongoDbSchema_1 = require("./ChangeScopesMongoDbSchema");
class ChangeScopesMongoDbPersistence extends pip_services_oss_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('change_scopes', ChangeScopesMongoDbSchema_1.ChangeScopesMongoDbSchema());
    }
    convertToPublic(item) {
        if (item) {
            item = super.convertFromPublic(item);
            item.elements = item.elements || {};
        }
        return item;
    }
    change(correlationId, id, callback) {
        let partial = {
            change_time: new Date()
        };
        this._model.findOneAndUpdate({ _id: id }, partial, { new: true, upsert: true }, (err, newItem) => {
            if (!err)
                this._logger.trace(correlationId, "Changed in %s by %s", this._collection, id);
            if (callback) {
                newItem = this.convertToPublic(newItem);
                callback(err, newItem);
            }
        });
    }
    changeElement(correlationId, id, element, callback) {
        let now = new Date();
        let partial = {
            change_time: now
        };
        partial['elements.' + element] = now;
        this._model.findOneAndUpdate({ _id: id }, partial, { new: true, upsert: true }, (err, newItem) => {
            if (!err)
                this._logger.trace(correlationId, "Changed in %s by %s", this._collection, id);
            if (callback) {
                newItem = this.convertToPublic(newItem);
                callback(err, newItem);
            }
        });
    }
}
exports.ChangeScopesMongoDbPersistence = ChangeScopesMongoDbPersistence;
//# sourceMappingURL=ChangeScopesMongoDbPersistence.js.map