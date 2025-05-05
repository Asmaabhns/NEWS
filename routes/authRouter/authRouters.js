import express from 'express'; // Importing express to create a router
import authController from '../../controllers/auth/authController.js';
import getAllUsers from '../../controllers/users/getAllUsers.js'; // Removed unnecessary comment
import { verifyToken } from '../../middleware/verifyJWT.js';

const UsersRouter = express.Router();

// Auth routes
UsersRouter.route('/register').post(authController.register);
UsersRouter.route('/login').post(authController.login);
UsersRouter.route('/logout').post(authController.logout);
UsersRouter.route('/refresh').post(authController.refresh);

// Protected routes
UsersRouter.use(verifyToken);
UsersRouter.route('/users').get(getAllUsers);

export default UsersRouter;
