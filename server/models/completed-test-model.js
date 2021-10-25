const { Schema, model } = require('mongoose');

const CompletedTestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    test: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
    completionDate: { type: Date, default: Date.now },
    right: { type: Number, default: 0 },
    wrong: { type: Number, default: 0 },
    missed: { type: Number, default: 0 },
});

module.exports = model('CompletedTest', CompletedTestSchema);