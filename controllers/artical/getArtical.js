import Artical from "../../models/articales.js";

const getArticales = async (req, res) => {
    try {
        const articales = await Artical.find().sort({ createdAt: -1 }); // Sort by creation date in descending order
        if (!courses.length) {
            return res.status(404).json({ success: false, message: "No courses found." });
        }
        res.status(200).json({ success: true, articales });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export default getArticales;