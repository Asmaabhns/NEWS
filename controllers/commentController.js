import Comment from "../models/comments.js";

// ✅ إنشاء تعليق جديد
export const createComment = async (req, res) => {
  try {
    const { comment, user } = req.body;

    const newComment = await Comment.create({
      comment,
      user,
      replay: [],
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
};

// ✅ جلب كل التعليقات
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

// ✅ إضافة رد على تعليق معين
export const addReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content, replayUser } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replay.push({
      content,
      replayUser,
    });

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error });
  }
};
