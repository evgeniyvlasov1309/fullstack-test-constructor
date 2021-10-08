const { Schema, model } = require('mongoose');

const QuestionSchema = new Schema({
    description: { type: String, required: true },
    type: { type: String, required: true, enum: ['radio', 'checkbox', 'input'] },
    order: { type: Number, required: true },
    test: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
});

module.exports = model('Question', QuestionSchema);