import Artical from "../../models/articales.js";

const deleteAtical = async (req, res) => {
    try {
        const {id } = req.params;

        // Check if the course exists
        const existingCourse = await Artical.findById(id);
        if (!existingCourse) {
            return res.status(404).json({ success: false, message: "Courseb 22  not found." });
        }

        // Delete the course
        await Artical.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Course deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export default deleteAtical;
