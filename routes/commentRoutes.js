import express from "express";
import {
  createComment,
  getAllComments,
  addReply
} from "../controllers/commentController.js"; // Importing comment controller functions
const routerComment = express.Router();

// ✅ Comment routes
routerComment.post("/", createComment); // إنشاء تعليق
routerComment.get("/", getAllComments); // جلب كل التعليقات
routerComment.post("/:commentId/reply", addReply); // الرد على تعليق

export default routerComment;
