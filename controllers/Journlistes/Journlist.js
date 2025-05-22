import Journlistes from "../../models/journalist.js";
import bcrypt from "bcrypt";

const createJournlist = async (req, res) => {
  try {
    const { fullName, email, phone, pressCard, password, specialization } = req.body;

    if (!fullName || !email || !phone || !pressCard || !password  || !specialization) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30


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

    res.status(201).json({ success: true, journalist });
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

    res.status(200).json({ success: true, journalist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}

export default {
  createJournlist,
  loginJournlist
};
