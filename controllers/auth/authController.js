import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendResetEmail } from "../../utils/emailSender.js";

// Token generators
const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { userInfo: { id: userId, role: role } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

const generateRefreshToken = (userId, role) => {
  return jwt.sign(
    { userInfo: { id: userId, role: role } },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

// Register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "جميع الحقول مطلوبة." });
    }

    const foundUser = await User.findOne({ email }).exec();
    if (foundUser) {
      return res.status(409).json({ success: false, message: "البريد الإلكتروني مستخدم بالفعل." });
    }

    const hashedPassword = await bcrypt.hash(password, 13);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      success: true,
      message: "تم التسجيل بنجاح.",
      accessToken,
      user: { email: user.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "خطأ في الخادم." });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "البريد وكلمة المرور مطلوبان." });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ success: false, message: "بيانات الاعتماد غير صحيحة." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "بيانات الاعتماد غير صحيحة." });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح.",
      accessToken,
      user: { email: user.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "خطأ في الخادم." });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204).send();

    const refreshToken = cookies.jwt;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
      return res.status(204).send();
    }

    user.refreshToken = "";
    await user.save();
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.status(200).json({ success: true, message: "تم تسجيل الخروج بنجاح." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "خطأ في الخادم." });
  }
};

// Refresh Token
const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken }).exec();
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user._id.toString() !== decoded.userInfo.id) return res.sendStatus(403);
    const accessToken = generateAccessToken(user._id, user.role);
    res.json({ accessToken });
  });
};

// Forget Password
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 15 * 60 * 1000; // 15 دقيقة
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    const subject = "إعادة تعيين كلمة المرور";
    const message = `لقد طلبت إعادة تعيين كلمة المرور.\nانقر على الرابط التالي لإعادة التعيين:\n${resetLink}`;

    const result = await sendResetEmail(email, subject, message);

    if (!result.success) {
      return res.status(500).json({ message: "فشل في إرسال البريد الإلكتروني." });
    }
    res.status(200).json({ message: "تم إرسال البريد الإلكتروني بنجاح.", success: true, resetLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "حدث خطأ ما." });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }, // تأكد إن التوكن لسه ساري
    });

    if (!user) {
      return res.status(400).json({ message: "الرابط غير صالح أو منتهي الصلاحية" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
  user.resetToken = undefined; // مسح التوكن بعد إعادة التعيين
    user.resetTokenExpiration = undefined; // مسح تاريخ انتهاء صلاحية التوكن
    await user.save();

    res.status(200).json({ message: "تم تعيين كلمة المرور بنجاح" });
  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ message: "حدث خطأ في الخادم" });
  }
}

export default {
  register,
  login,
  logout,
  refresh,
  forgetPassword,
  resetPassword
};
