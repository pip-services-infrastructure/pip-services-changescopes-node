import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { ChangeScopeV1 } from '../data/version1/ChangeScopeV1';
import { IChangeScopesController } from './IChangeScopesController';
export declare class ChangeScopesController implements IConfigurable, IReferenceable, ICommandable, IChangeScopesController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getScopeById(correlationId: string, id: string, callback: (err: any, scope: ChangeScopeV1) => void): void;
    changeScope(correlationId: string, id: string, callback: (err: any, scope: ChangeScopeV1) => void): void;
    changeScopeElement(correlationId: string, id: string, element: string, callback: (err: any, scope: ChangeScopeV1) => void): void;
    deleteScopeById(correlationId: string, id: string, callback: (err: any, scope: ChangeScopeV1) => void): void;
}
