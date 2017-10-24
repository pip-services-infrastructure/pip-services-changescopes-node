"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.ChangeScopesMongoDbSchema = function (collection) {
    collection = collection || 'change_scopes';
    let schema = new mongoose_1.Schema({
        _id: { type: String },
        change_time: { type: Date, required: true, 'default': Date.now },
        elements: { type: Mixed, required: false, 'default': {} }
    }, {
        collection: collection,
        autoIndex: true,
        strict: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=ChangeScopesMongoDbSchema.js.map