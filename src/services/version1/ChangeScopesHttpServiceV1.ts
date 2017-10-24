import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class ChangeScopesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('change_scopes');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-changescopes', 'controller', 'default', '*', '1.0'));
    }
}