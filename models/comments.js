import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    user: {
      _id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      name: { type: String, required: true },
    },
    content: { type: String, required: true }, // التعليق نفسه
    replies: [
      {
        user: {
          _id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
          },
          name: { type: String, required: true },
        },
        content: { type: String, required: true }, // الرد على التعليق
        createdAt: { type: Date, default: Date.now },
      }
    ]
  },
  { timestamps: true }
);

// لو عايز تسميه Comment:
const Comment = model("Comment", commentSchema);

export default Comment;