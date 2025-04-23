import express from "express";
import { createPost } from "../controllers/adminController.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only Admins Can Create Posts
router.post("/create-post", verifyToken, verifyAdmin, createPost);

export default router;
