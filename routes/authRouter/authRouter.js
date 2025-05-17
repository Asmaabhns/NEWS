import express from 'express'; // Importing express to create a router
import authController from '../../controllers/auth/authController.js';
import Journlist from '../../controllers/Journlistes/Journlist.js';

const UsersRouter = express.Router();

// Auth routes

// jourlistes roues
UsersRouter.route('/journlist/login').post(Journlist.loginJournlist);
UsersRouter.route('/journlist/register').post(Journlist.createJournlist);

// user routes

UsersRouter.route('/register').post(authController.register);
UsersRouter.route('/login').post(authController.login);
UsersRouter.route('/logout').post(authController.logout);
UsersRouter.route('/refresh').post(authController.refresh);


export default UsersRouter;
