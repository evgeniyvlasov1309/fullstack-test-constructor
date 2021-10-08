const Router = require('express').Router;
const { body } = require('express-validator');

const userController = require('../controllers/user-controller');

const authRouter = new Router();

authRouter.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration);
authRouter.post('/login', userController.login);
authRouter.post('/logout', userController.logout);
authRouter.post('/reset-password', userController.resetPassword);
authRouter.post('/change-password', userController.changePassword);
authRouter.get('/activate/:link', userController.activate);
authRouter.get('/refresh', userController.refresh);

module.exports = authRouter;