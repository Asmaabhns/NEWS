import authController from '../controllers/auth/authController.js'; 
import express from 'express'; // Importing express to create a router 

const UsersRouter   = express.Router();

UsersRouter.route('/register').post(authController.register);
UsersRouter.route('/login').post(authController.login);
UsersRouter.route('/logout').post(authController.logout)
UsersRouter.route('/refresh').post(authController.refresh)


export default UsersRouter ;
