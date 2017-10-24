import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { ChangeScopesServiceFactory } from '../build/ChangeScopesServiceFactory';

export class ChangeScopesProcess extends ProcessContainer {

    public constructor() {
        super("change_scopes", "Change scopes microservice");
        this._factories.add(new ChangeScopesServiceFactory);
    }


}
