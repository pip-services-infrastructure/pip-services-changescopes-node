import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let ChangeScopesMongoDbSchema = function(collection?: string) {
    collection = collection || 'change_scopes';

    let schema = new Schema(
        {
            _id: { type: String },
            change_time: { type: Date, required: true, 'default': Date.now },
            elements: { type: Mixed, required: false, 'default': {} }
        },
        {
            collection: collection,
            autoIndex: true,
            strict: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}
