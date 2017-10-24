import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';

import { ChangeScopesMemoryPersistence } from './ChangeScopesMemoryPersistence';
import { ChangeScopeV1 } from '../data/version1/ChangeScopeV1';

export class ChangeScopesFilePersistence extends ChangeScopesMemoryPersistence {
	protected _persister: JsonFilePersister<ChangeScopeV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<ChangeScopeV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}