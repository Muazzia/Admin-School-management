const { validateCreateCourse } = require("../joischemas/course");
const Course = require("../models/courseModel")
const CourseImage = require("../models/courseImageModel")
const { resWrapper } = require("../utils");
const { uploadMultipleToCloudinary } = require("../utils/cloudinary");
const CourseCategory = require("../models/courseCategoryModel");

const includeObj = {
    include: [
        { model: CourseImage, as: "images", attributes: { exclude: ["courseId"] } },
        { model: CourseCategory }
    ]
};

const createCourse = async (req, res) => {
    const { error, value } = validateCreateCourse(req.body)

    if (error) return res.status(400).send(resWrapper(error.message, 400, null, error.message));

    const categroy = await CourseCategory.findByPk(value.categoryId);
    if (!categroy) return res.status(404).send(resWrapper("Category Not Found", 404, null, "Category Id Is Not Valid"))

    const response = await uploadMultipleToCloudinary(req.files, "course");
    if (!response.isSuccess) return res.status(400).send(resWrapper("Image upload Error. Try again", 400, "Images can't be upload at the moment try again later"))

    if (response.data.length === 0) return res.status(400).send(resWrapper("Image upload Error. Try again", 400, "Images can't be upload at the moment try again later"));

    const course = await Course.create({ ...value });

    const courseImages = response.data.map(url => ({
        url,
        courseId: course.id,
    }));

    await CourseImage.bulkCreate(courseImages);

    const temp = await Course.findByPk(course.id, {
        ...includeObj
    })

    return res.status(201).send(resWrapper("Course Created", 201, temp))

}

const getAllCourses = async (req, res) => {
    const courses = await Course.findAll({
        ...includeObj
    });

    return res.status(200).send(resWrapper("Courses Reterived", 200, courses))

}

const getACourse = async (req, res) => {
    const id = req.params.id;

    const course = await Course.findByPk(id, {
        ...includeObj
    });

    if (!course) return res.status(404).send(resWrapper("Course Not Found", 404, null, "Id is not valid"))

    return res.status(200).send(resWrapper("Courses Reterived", 200, course))

}

module.exports = { createCourse, getAllCourses, getACourse }