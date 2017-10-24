import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { ChangeScopesServiceFactory } from '../build/ChangeScopesServiceFactory';

export class ChangeScopesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("change_scopes", "Change scopes function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-changescopes', 'controller', 'default', '*', '*'));
        this._factories.add(new ChangeScopesServiceFactory());
    }
}

export const handler = new ChangeScopesLambdaFunction().getHandler();