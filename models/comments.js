import mongoose from "mongoose";

const { Schema, model } = mongoose;

const replaySchema = new Schema(
  {
    content: { type: String, required: true },
    replayUser: {
      _id: { type: String },
      name: { type: String, required: true }
    }
  },
  { _id: false }
);

const commentSchema = new Schema(
  {
    user: { type: String, required: true },
    comment: { type: String, required: true },
    replay: [replaySchema]
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export default Comment;