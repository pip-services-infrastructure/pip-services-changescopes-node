import { ConfigParams } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

import { ChangeScopeV1 } from '../data/version1/ChangeScopeV1';
import { ChangeScopeV1Schema } from '../data/version1/ChangeScopeV1Schema';
import { IChangeScopesController } from './IChangeScopesController';

export class ChangeScopesCommandSet extends CommandSet {
    private _logic: IChangeScopesController;

    constructor(logic: IChangeScopesController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetScopeByIdCommand());
		this.addCommand(this.makeChangeScopeCommand());
		this.addCommand(this.makeChangeScopeElementCommand());
		this.addCommand(this.makeDeleteScopeByIdCommand());
    }

	private makeGetScopeByIdCommand(): ICommand {
		return new Command(
			"get_scope_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let id = args.getAsNullableString("id");
                this._logic.getScopeById(correlationId, id, callback);
            }
		);
	}

	private makeChangeScopeCommand(): ICommand {
		return new Command(
			"change_scope",
			new ObjectSchema(true)
				.withRequiredProperty('id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let id = args.getAsNullableString("id");
                this._logic.changeScope(correlationId, id, callback);
            }
		);
	}

	private makeChangeScopeElementCommand(): ICommand {
		return new Command(
			"change_scope_element",
			new ObjectSchema(true)
				.withRequiredProperty('id', TypeCode.String)
				.withRequiredProperty('element', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let id = args.getAsNullableString("id");
                let element = args.getAsNullableString("element");
                this._logic.changeScopeElement(correlationId, id, element, callback);
            }
		);
	}

	private makeDeleteScopeByIdCommand(): ICommand {
		return new Command(
			"delete_scope_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let id = args.getAsNullableString("id");
                this._logic.deleteScopeById(correlationId, id, callback);
            }
		);
	}

}