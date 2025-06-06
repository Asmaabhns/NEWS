import mongoose from "mongoose";

const journalistSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    pressCard: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true, trim: true },
    resetToken: String,
    resetTokenExpiration: Date,
  },
  { timestamps: true }
);

const Journlistes = mongoose.model("Journlistes", journalistSchema);
export default Journlistes;
