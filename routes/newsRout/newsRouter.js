import express from "express";
import { verifyAdmin, verifyToken } from '../../middleware/verifyJWT.js';
import createNews from "../../controllers/nwes/createNews.js";
import deleteNews from "../../controllers/nwes/deletNews.js";
import getNews from "../../controllers/nwes/getNews.js";


const newsRouter = express.Router();

newsRouter.route("/").get(getNews); // Get a single post by ID
newsRouter.route('/create').post(verifyToken,verifyAdmin, createNews)
newsRouter.route('/:id').delete(verifyToken,verifyAdmin,deleteNews); // Delete a post by ID

export default newsRouter;





