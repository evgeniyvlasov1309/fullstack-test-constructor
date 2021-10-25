const answerService = require("../service/answer-service");

class AnswerController {
    async createUserAnswer(req, res, next) {
        try {
            const userId = req.user.id;
            const { id: answerId } = req.params;
            const { value } = req.body;
            const answerUserData = await answerService.createUserAnswer(userId, answerId, value);
            return res.json(answerUserData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AnswerController();