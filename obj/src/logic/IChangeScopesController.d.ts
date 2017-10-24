import { ChangeScopeV1 } from '../data/version1/ChangeScopeV1';
export interface IChangeScopesController {
    getScopeById(correlationId: string, id: string, callback: (err: any, scope: ChangeScopeV1) => void): void;
    changeScope(correlationId: string, id: string, callback?: (err: any, scope: ChangeScopeV1) => void): void;
    changeScopeElement(correlationId: string, id: string, element: string, callback?: (err: any, scope: ChangeScopeV1) => void): void;
    deleteScopeById(correlationId: string, id: string, callback: (err: any, scope: ChangeScopeV1) => void): void;
}
