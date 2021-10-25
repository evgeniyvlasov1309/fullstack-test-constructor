const Router = require('express').Router;
const { body } = require('express-validator');

const testController = require('../controllers/test-controller');

const testsRouter = new Router();

testsRouter.post('/tests', testController.createTest);
testsRouter.get('/tests', testController.getTests);
testsRouter.get('/tests/completed', testController.getCompletedTests);
testsRouter.get('/tests/completed/:id', testController.getCompletedTestById);
testsRouter.get('/tests/:id', testController.getTestById);
testsRouter.put('/tests/:id', testController.updateTest);
testsRouter.delete('/tests/:id', testController.deleteTest);
testsRouter.post('/tests/:id', testController.completeTest);

module.exports = testsRouter;