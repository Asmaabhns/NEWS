import express from 'express'; // Importing express to create a router
import authController from '../../controllers/auth/authController.js';
import journlistController from '../../controllers/Journlistes/Journlist.js'; // Importing the controller for journalist routes

const UsersRouter = express.Router();

// Auth routes

// jourlistes roues
UsersRouter.route('/journalist/login').post(journlistController.loginJournlist);
UsersRouter.route('/journalist/register').post(journlistController.createJournlist);

// user routes

UsersRouter.route('/register').post(authController.register);
UsersRouter.route('/login').post(authController.login);
UsersRouter.route('/logout').post(authController.logout);
UsersRouter.route('/refresh').post(authController.refresh);


export default UsersRouter;
