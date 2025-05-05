import express from "express";

const courseRouter = express.Router();

import { verifyToken, verifyAdmin } from "../../middleware/verifyJWT.js";
import createCourse from "../../controllers/courses/createCourse.js";
import getCourses from "../../controllers/courses/getCourses.js";
import deleteCourse from "../../controllers/courses/deleteCourse.js";

courseRouter.route("/").get(getCourses); // Get all courses
courseRouter.route("/create").post(verifyToken, verifyAdmin, createCourse); // Create a new course
courseRouter.route("/:id").delete( deleteCourse); // Delete a course by ID

export default courseRouter;
