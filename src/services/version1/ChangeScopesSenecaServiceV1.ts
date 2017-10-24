import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class ChangeScopesSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('change_scopes');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-changescopes', 'controller', 'default', '*', '1.0'));
    }
}