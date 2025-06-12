import Journlistes from "../../models/journalist.js";
import bcrypt from "bcryptjs";
import { sendResetEmail } from "../../utils/emailSender.js";
import crypto from 'crypto';

const createJournlist = async (req, res) => {
  try {
    const { fullName, email, phone, pressCard, password, specialization } = req.body;

    if (!fullName || !email || !phone || !pressCard || !password  || !specialization) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }



    const existingEmail = await Journlistes.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: "Email already exists." });
    }

    const existingpressCard = await Journlistes.findOne({ pressCard });
    if (existingpressCard) {
      return res.status(400).json({ success: false, message: "pressCard already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const journalist = new Journlistes({
      fullName,
      email,
      phone,
      pressCard,
      password: hashedPassword,
      specialization,
    });

    await journalist.save();

    res.status(201).json({ success: true,  journalist: {
    id: journalist._id,
    fullName: journalist.fullName,
    email: journalist.email,
    phone: journalist.phone,
    pressCard: journalist.pressCard,
    specialization: journalist.specialization,
  }, });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const loginJournlist = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const journalist = await Journlistes.findOne({ email });
    if (!journalist) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, journalist.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    res.status(200).json({ success: true, journalist:{
      email: journalist.email,
      fullName: journalist.fullName,
      id: journalist._id,
    } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}
export const forgetJournalistPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const journalist = await Journlistes.findOne({ email });

    if (!journalist) {
      return res.status(404).json({ message: "الصحفي غير موجود." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    journalist.resetToken = token;
    journalist.resetTokenExpiration = Date.now() + 15 * 60 * 1000;
    await journalist.save();

    const resetLink = `http://localhost:5173/journalist/reset-password/${token}`;
    const subject = "إعادة تعيين كلمة المرور للصحفي";
    const message = `لقد طلبت إعادة تعيين كلمة المرور.\nانقر على الرابط التالي:\n${resetLink}`;

    const result = await sendResetEmail(email, subject, message);
    if (!result.success) {
      return res.status(500).json({ message: "فشل في إرسال البريد الإلكتروني." });
    }

    res.status(200).json({ message: "تم إرسال البريد الإلكتروني بنجاح." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "حدث خطأ في الخادم." });
  }
};


export const resetJournalistPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const journalist = await Journlistes.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!journalist) {
      return res.status(400).json({ message: "الرابط غير صالح أو منتهي الصلاحية" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    journalist.password = hashedPassword;
    journalist.resetToken = undefined;
    journalist.resetTokenExpiration = undefined;

    await journalist.save();

    res.status(200).json({ message: "تم تعيين كلمة المرور بنجاح" });
  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ message: "حدث خطأ في الخادم" });
  }
};

export default {
  createJournlist,
  loginJournlist,
  resetJournalistPassword ,
  forgetJournalistPassword,
};
