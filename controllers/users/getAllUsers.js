import User from "../../models/user.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from the response
    if (!users.length) {
      return res.status(404).json({ success: false, message: "No users found." });
    }
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found." });
//     }
//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// }
export default getAllUsers