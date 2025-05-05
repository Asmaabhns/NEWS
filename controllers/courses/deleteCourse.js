import Course from "../../models/courses.js";

const deleteCourse = async (req, res) => {
    try {
        const {id } = req.params;

        // Check if the course exists
        const existingCourse = await Course.findById(id);
        if (!existingCourse) {
            return res.status(404).json({ success: false, message: "Courseb 22  not found." });
        }

        // Delete the course
        await Course.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Course deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export default deleteCourse;
