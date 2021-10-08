const Router = require('express').Router;

const questionController = require('../controllers/question-controller');

const questionsRouter = new Router();

questionsRouter.post('/questions', questionController.createQuestion);
questionsRouter.put('/questions/:id', questionController.updateQuestion);
questionsRouter.delete('/questions/:id', questionController.deleteQuestion);

module.exports = questionsRouter;