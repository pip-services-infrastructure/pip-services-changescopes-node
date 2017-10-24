import { CommandSet } from 'pip-services-commons-node';
import { IChangeScopesController } from './IChangeScopesController';
export declare class ChangeScopesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IChangeScopesController);
    private makeGetScopeByIdCommand();
    private makeChangeScopeCommand();
    private makeChangeScopeElementCommand();
    private makeDeleteScopeByIdCommand();
}
