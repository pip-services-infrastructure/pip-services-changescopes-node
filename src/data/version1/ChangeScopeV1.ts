import { ConfigParams } from 'pip-services-commons-node';
import { IStringIdentifiable } from 'pip-services-commons-node';

export class ChangeScopeV1 implements IStringIdentifiable {
    public constructor (id: string) {
        this.id = id;
        this.elements = {};
        this.change_time = new Date();
    }

    public id: string;
    public change_time: Date;
    public elements: any;
}