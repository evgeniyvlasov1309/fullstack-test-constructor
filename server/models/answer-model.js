const { Schema, model } = require('mongoose');

const AnswerSchema = new Schema({
    value: { type: String },
    correct: { type: Boolean },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
});

module.exports = model('Answer', AnswerSchema);