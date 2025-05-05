import Course from "../../models/courses.js";

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 }); // Sort by creation date in descending order
        if (!courses.length) {
            return res.status(404).json({ success: false, message: "No courses found." });
        }
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export default getCourses;