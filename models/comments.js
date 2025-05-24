// Comment Schema (Mongoose Example)
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
{
  _id: ObjectId,
  user: {
    _id: ObjectId,
    name: String,
    // ممكن تضيف صورة أو أي بيانات تانية
  },
  content: String, // التعليق نفسه
  replies: [
    {
      _id: ObjectId,
      user: {
        _id: ObjectId,
        name: String,
      },
      content: String, // الرد على التعليق
      createdAt: Date
    }
  ],
  createdAt: Date
}
  { timestamps: true }
);
const News = mongoose.model("News", postSchema);
export default News;