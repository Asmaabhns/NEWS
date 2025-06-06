import express from 'express';
import authController  from '../../controllers/auth/authController.js';
import  journlistController from '../../controllers/Journlistes/Journlist.js'
const UsersRouter = express.Router();

// journalist routes
UsersRouter.route('/journalist/login').post(journlistController.loginJournlist);
UsersRouter.route('/journalist/register').post(journlistController.createJournlist);

// journalist password reset
UsersRouter.route('/journalist/forget-password').post(journlistController.forgetJournalistPassword);
UsersRouter.route('/journalist/reset-password/:token').put(journlistController.resetJournalistPassword);

// user routes
UsersRouter.route('/register').post(authController.register);
UsersRouter.route('/login').post(authController.login);
UsersRouter.route('/logout').post(authController.logout);
UsersRouter.route('/refresh').post(authController.refresh);
UsersRouter.route('/forget-password').post(authController.forgetPassword);
UsersRouter.route('/reset-password/:token').put(authController.resetPassword);

export default UsersRouter;
