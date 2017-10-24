"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class ChangeScopeV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('elements', pip_services_commons_node_2.TypeCode.Map);
        this.withOptionalProperty('change_time', null); //TypeCode.DateTime);
    }
}
exports.ChangeScopeV1Schema = ChangeScopeV1Schema;
//# sourceMappingURL=ChangeScopeV1Schema.js.map