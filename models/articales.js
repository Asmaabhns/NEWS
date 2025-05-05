import mongoose from "mongoose";

const articlSchema = new mongoose.Schema(
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
const artical = mongoose.model("artic", articlSchema);
export default artical;