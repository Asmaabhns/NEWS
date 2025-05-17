import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    classification: {
      type: String,
      required: true,
      enum: ["health", "sports", "the weather", "Disasters" ],
    },
    Writer: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);
const News = mongoose.model("News", postSchema);
export default News;