const Router = require('express').Router;

const answersController = require('../controllers/answer-controller');

const answersRouter = new Router();

answersRouter.post('/answers/:id', answersController.createUserAnswer);

module.exports = answersRouter;