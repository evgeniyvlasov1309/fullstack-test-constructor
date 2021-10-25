const { ObjectId } = require('mongodb');
const UserAnswerModel = require('../models/user-answer-model');

class AnswerService {
    async createUserAnswer(userId, answerId, value) {
        const userAnswer = await UserAnswerModel.findOne({ user: ObjectId(userId), answer: ObjectId(answerId) });
        if (userAnswer) {
            userAnswer.value = value;
            return await userAnswer.save();
        }
        return await UserAnswerModel.create({ user: userId, answer: answerId, value });
    }
}

module.exports = new AnswerService();