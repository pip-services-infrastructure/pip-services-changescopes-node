import { IStringIdentifiable } from 'pip-services-commons-node';
export declare class ChangeScopeV1 implements IStringIdentifiable {
    constructor(id: string);
    id: string;
    change_time: Date;
    elements: {
        [element: string]: Date;
    };
}
