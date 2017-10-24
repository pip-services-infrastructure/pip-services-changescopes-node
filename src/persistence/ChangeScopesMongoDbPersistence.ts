let _ = require('lodash');

import { ConfigParams } from 'pip-services-commons-node';
import { StringConverter } from 'pip-services-commons-node';

import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';

import { ChangeScopeV1 } from '../data/version1/ChangeScopeV1';
import { IChangeScopesPersistence } from './IChangeScopesPersistence';
import { ChangeScopesMongoDbSchema } from './ChangeScopesMongoDbSchema';

export class ChangeScopesMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<ChangeScopeV1, string> 
    implements IChangeScopesPersistence {

    constructor() {
        super('change_scopes', ChangeScopesMongoDbSchema());
    }

    public convertToPublic(item: any): any {
        if (item) {
            item = super.convertFromPublic(item);
            item.elements = item.elements || {};
        }
        return item;
    }

    public change(correlationId: string, id: string,
        callback: (err: any, item: ChangeScopeV1) => void): void {

        let partial: any = {
            change_time: new Date()
        }

        this._model.findOneAndUpdate(
            { _id: id }, 
            partial, 
            { new: true, upsert: true }, 
            (err, newItem) => {
                if (!err)
                    this._logger.trace(correlationId, "Changed in %s by %s", this._collection, id);
            
                if (callback) {
                    newItem = this.convertToPublic(newItem);
                    callback(err, newItem);
                }
            }
        );
    }

    public changeElement(correlationId: string, id: string, element: string,
        callback: (err: any, item: ChangeScopeV1) => void): void {

        let now = new Date();
        let partial: any = {
            change_time: now
        }
        partial['elements.' + element] = now;

        this._model.findOneAndUpdate(
            { _id: id }, 
            partial, 
            { new: true, upsert: true }, 
            (err, newItem) => {
                if (!err)
                    this._logger.trace(correlationId, "Changed in %s by %s", this._collection, id);
            
                if (callback) {
                    newItem = this.convertToPublic(newItem);
                    callback(err, newItem);
                }
            }
        );
    }
    
}
