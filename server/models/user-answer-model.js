const { Schema, model } = require('mongoose');

const UserAnswerSchema = new Schema({
    answer: { type: Schema.Types.ObjectId, ref: 'Answer', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    test: { type: Schema.Types.ObjectId, ref: 'CompletedTest', required: true },
    value: { type: String },
});

module.exports = model('UserAnswer', UserAnswerSchema);