import express from "express";
import {
  createComment,
  getAllComments,
  addReply
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", createComment); // إنشاء تعليق
router.get("/", getAllComments); // جلب كل التعليقات
router.post("/:commentId/reply", addReply); // الرد على تعليق

export default router;