import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);
const  Course = mongoose.model(" Course", courseSchema);
export default  Course;