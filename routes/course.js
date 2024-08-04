const express = require("express");
const { uploadImages } = require("../middlewares/multer");
const { createCourse, getAllCourses, getACourse } = require("../controllers/course")
const courseRouter = express.Router();


courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getACourse);

courseRouter.post("/", uploadImages({ fieldName: "images", isRequired: true, maxCount: 10, }), createCourse);

courseRouter.put("/:id");
courseRouter.delete("/:id");





module.exports = courseRouter;