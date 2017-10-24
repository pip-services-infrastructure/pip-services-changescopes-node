import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class ChangeScopeV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('id', TypeCode.String);
        this.withOptionalProperty('elements', TypeCode.Map);
        this.withOptionalProperty('change_time', null); //TypeCode.DateTime);
    }
}