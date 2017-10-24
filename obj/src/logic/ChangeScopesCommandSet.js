"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
class ChangeScopesCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetScopeByIdCommand());
        this.addCommand(this.makeChangeScopeCommand());
        this.addCommand(this.makeChangeScopeElementCommand());
        this.addCommand(this.makeDeleteScopeByIdCommand());
    }
    makeGetScopeByIdCommand() {
        return new pip_services_commons_node_2.Command("get_scope_by_id", new pip_services_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('id', pip_services_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let id = args.getAsNullableString("id");
            this._logic.getScopeById(correlationId, id, callback);
        });
    }
    makeChangeScopeCommand() {
        return new pip_services_commons_node_2.Command("change_scope", new pip_services_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('id', pip_services_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let id = args.getAsNullableString("id");
            this._logic.changeScope(correlationId, id, callback);
        });
    }
    makeChangeScopeElementCommand() {
        return new pip_services_commons_node_2.Command("change_scope_element", new pip_services_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('id', pip_services_commons_node_4.TypeCode.String)
            .withRequiredProperty('element', pip_services_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let id = args.getAsNullableString("id");
            let element = args.getAsNullableString("element");
            this._logic.changeScopeElement(correlationId, id, element, callback);
        });
    }
    makeDeleteScopeByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_scope_by_id", new pip_services_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('id', pip_services_commons_node_4.TypeCode.String), (correlationId, args, callback) => {
            let id = args.getAsNullableString("id");
            this._logic.deleteScopeById(correlationId, id, callback);
        });
    }
}
exports.ChangeScopesCommandSet = ChangeScopesCommandSet;
//# sourceMappingURL=ChangeScopesCommandSet.js.map