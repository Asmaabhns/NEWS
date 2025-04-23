import express from "express";
import getPosts from "../../controllers/posts/getPosts.js";
import createdPost from '../../controllers/posts/createPost.js';
import { verifyAdmin, verifyToken } from '../../middleware/verifyJWT.js';
import deletePost from "../../controllers/posts/deletPost.js";
import updatePost from "../../controllers/posts/updatePost.js";

const postRouter = express.Router();

postRouter.route("/").get(getPosts); // Get a single post by ID
postRouter.route('/create').post(verifyToken,verifyAdmin, createdPost)
postRouter.route('/:id').delete(verifyToken,verifyAdmin,deletePost); // Delete a post by ID
 postRouter.route('/:id').put(verifyToken,verifyAdmin,updatePost); // Update a post by ID

export default postRouter;





