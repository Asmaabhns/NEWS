import express from "express";
import  getAllUsers  from "../controllers/users/getAllUsers.js"; // Added curly braces
import { verifyToken } from "../middleware/verifyJWT.js";
const router = express.Router();

router.use(verifyToken)
router.route("/").get(getAllUsers);
export default router;