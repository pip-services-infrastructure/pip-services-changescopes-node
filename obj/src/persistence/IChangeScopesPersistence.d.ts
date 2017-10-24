import { IGetter } from 'pip-services-data-node';
import { ChangeScopeV1 } from '../data/version1/ChangeScopeV1';
export interface IChangeScopesPersistence extends IGetter<ChangeScopeV1, string> {
    getOneById(correlationId: string, id: string, callback: (err: any, item: ChangeScopeV1) => void): void;
    change(correlationId: string, id: string, callback: (err: any, item: ChangeScopeV1) => void): void;
    changeElement(correlationId: string, id: string, element: string, callback: (err: any, item: ChangeScopeV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: ChangeScopeV1) => void): void;
}
