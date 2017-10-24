import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { ChangeScopeV1 } from '../data/version1/ChangeScopeV1';
import { IChangeScopesPersistence } from './IChangeScopesPersistence';
export declare class ChangeScopesMemoryPersistence extends IdentifiableMemoryPersistence<ChangeScopeV1, string> implements IChangeScopesPersistence {
    constructor();
    change(correlationId: string, id: string, callback: (err: any, item: ChangeScopeV1) => void): void;
    changeElement(correlationId: string, id: string, element: string, callback: (err: any, item: ChangeScopeV1) => void): void;
}
