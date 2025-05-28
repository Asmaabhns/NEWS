import Journlistes from "../../models/journalist.js";
import bcrypt from "bcrypt";

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

export default {
  createJournlist,
  loginJournlist
};
