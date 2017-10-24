let _ = require('lodash');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';

import { ChangeScopeV1 } from '../data/version1/ChangeScopeV1';
import { IChangeScopesPersistence } from '../persistence/IChangeScopesPersistence';
import { IChangeScopesController } from './IChangeScopesController';
import { ChangeScopesCommandSet } from './ChangeScopesCommandSet';

export class ChangeScopesController implements IConfigurable, IReferenceable, ICommandable, IChangeScopesController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-changescopes:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ChangeScopesController._defaultConfig);
    private _persistence: IChangeScopesPersistence;
    private _commandSet: ChangeScopesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IChangeScopesPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ChangeScopesCommandSet(this);
        return this._commandSet;
    }

    public getScopeById(correlationId: string, id: string, 
        callback: (err: any, scope: ChangeScopeV1) => void): void {
        this._persistence.getOneById(correlationId, id, (err, item) => {
            if (err == null && item == null) {
                item = <ChangeScopeV1> {
                    id: id,
                    change_time: new Date(0),
                    elements: {}
                };
            }
            callback(err, item)
        });
    }
    
    public changeScope(correlationId: string, id: string, 
        callback: (err: any, scope: ChangeScopeV1) => void): void {
        this._persistence.change(correlationId, id, (err, item) => {
            if (err == null && item == null) {
                item = <ChangeScopeV1> {
                    id: id,
                    change_time: new Date(),
                    elements: {}
                };
            }
            callback(err, item)
        });
    }

    public changeScopeElement(correlationId: string, id: string, element: string,
        callback: (err: any, scope: ChangeScopeV1) => void): void {
        this._persistence.changeElement(correlationId, id, element, (err, item) => {
            if (err == null && item == null) {
                item = <ChangeScopeV1> {
                    id: id,
                    change_time: new Date(),
                    elements: {}
                };
                item.elements[element] = item.change_time;
            }
            callback(err, item)
        });
    }
    
    public deleteScopeById(correlationId: string, id: string, 
        callback: (err: any, scope: ChangeScopeV1) => void): void {
        this._persistence.deleteById(correlationId, id, callback);
    }

}
