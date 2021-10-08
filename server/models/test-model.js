const { Schema, model } = require('mongoose');

const TestSchema = new Schema({
    title: { type: String, unique: true, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    creationDate: { type: Date, default: Date.now },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = model('Test', TestSchema);