"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ChangeScopesCommandSet_1 = require("./ChangeScopesCommandSet");
class ChangeScopesController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(ChangeScopesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new ChangeScopesCommandSet_1.ChangeScopesCommandSet(this);
        return this._commandSet;
    }
    getScopeById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, (err, item) => {
            if (err == null && item == null) {
                item = {
                    id: id,
                    change_time: new Date(0),
                    elements: {}
                };
            }
            callback(err, item);
        });
    }
    changeScope(correlationId, id, callback) {
        this._persistence.change(correlationId, id, (err, item) => {
            if (err == null && item == null) {
                item = {
                    id: id,
                    change_time: new Date(),
                    elements: {}
                };
            }
            callback(err, item);
        });
    }
    changeScopeElement(correlationId, id, element, callback) {
        this._persistence.changeElement(correlationId, id, element, (err, item) => {
            if (err == null && item == null) {
                item = {
                    id: id,
                    change_time: new Date(),
                    elements: {}
                };
                item.elements[element] = item.change_time;
            }
            callback(err, item);
        });
    }
    deleteScopeById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
ChangeScopesController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-changescopes:persistence:*:*:1.0');
exports.ChangeScopesController = ChangeScopesController;
//# sourceMappingURL=ChangeScopesController.js.map