const { Schema, model } = require('mongoose');

const CompletedTestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    test: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
    right: { type: Number, required: true },
    wrong: { type: Number, required: true },
});

module.exports = model('CompletedTest', CompletedTestSchema);