const questionService = require("../service/question-service");

class QuestionController {
    async createQuestion(req, res, next) {
        try {
            const { testId, type, order, description, answers } = req.body;
            const questionData = await questionService.createQuestion(testId, type, order, description, answers);
            return res.json(questionData);
        } catch (e) {
            next(e);
        }
    }

    async updateQuestion(req, res, next) {
        try {
            const { id } = req.params;
            const { type, order, description, answers } = req.body;
            const questionData = await questionService.updateQuestion(id, type, order, description, answers);
            return res.json(questionData);
        } catch (e) {
            next(e);
        }
    }

    async deleteQuestion(req, res, next) {
        try {
            const { id } = req.params;
            const questionData = await questionService.deleteQuestion(id);
            return res.json(questionData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new QuestionController();