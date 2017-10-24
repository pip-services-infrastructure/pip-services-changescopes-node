let _ = require('lodash');

import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';

import { ChangeScopeV1 } from '../data/version1/ChangeScopeV1';
import { IChangeScopesPersistence } from './IChangeScopesPersistence';

export class ChangeScopesMemoryPersistence 
    extends IdentifiableMemoryPersistence<ChangeScopeV1, string> 
    implements IChangeScopesPersistence {

    constructor() {
        super();
    }

    public change(correlationId: string, id: string,
        callback: (err: any, item: ChangeScopeV1) => void): void {

        let index = this._items.map((x) => { return x.id; }).indexOf(id);

        let item: ChangeScopeV1 = index >= 0 
            ? this._items[index] : new ChangeScopeV1(id);

        // Update time
        item.change_time = new Date();

        if (index < 0) this._items.push(item);

        this._logger.trace(correlationId, "Updated item by %s", id);

        this.save(correlationId, (err) => {
            if (callback) callback(err, item)
        });
    }

    public changeElement(correlationId: string, id: string, element: string,
        callback: (err: any, item: ChangeScopeV1) => void): void {

        let index = this._items.map((x) => { return x.id; }).indexOf(id);

        let item: ChangeScopeV1 = index >= 0 
            ? this._items[index] : new ChangeScopeV1(id);

        // Update time
        let now = new Date();
        item.change_time = now;

        // Update element
        item.elements = item.elements || {};
        item.elements[element] = now;

        if (index < 0) this._items.push(item);

        this._logger.trace(correlationId, "Updated item by %s", id);

        this.save(correlationId, (err) => {
            if (callback) callback(err, item)
        });
    }
    
}
