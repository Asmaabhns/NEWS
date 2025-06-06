import express from "express";
import { verifyAdmin, verifyToken } from '../../middleware/verifyJWT.js';
import createNews from "../../controllers/nwes/createNews.js";
import deleteNews from "../../controllers/nwes/deletNews.js";
import  { getNews, getNewsById } from "../../controllers/nwes/getNews.js";
import likeNews from "../../controllers/nwes/likeNews.js";


const newsRouter = express.Router();

newsRouter.route('/create').post( createNews)
newsRouter.route("/").get(getNews); // Get a single post by ID
newsRouter.route("/by-user/:userId").get(getNewsById); // Get a single post by ID

newsRouter.route('/:id/like').put( likeNews);

newsRouter.route('/:id').delete(verifyToken,verifyAdmin,deleteNews); // Delete a post by ID

export default newsRouter;





