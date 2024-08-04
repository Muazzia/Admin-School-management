const Enrollment = require("../models/enrollment");
const Student = require("../models/studentModel");
const { resWrapper } = require("../utils");

const { validateCreateEnrollment } = require("../joischemas/enrollment");

const createEnrollment = async (req, res) => {
    const { error, value: { studentId, courseId } } = validateCreateEnrollment(req.body)
    if (error) return res.status(400).send(resWrapper(error.message, 400, null, error.message));

    const student = await Student.findByPk(studentId);
    if (!student) return res.status(404).send(resWrapper("Student Not Found", 404, null, "Student Id Is Not Valid"));

    const course = await Student.findByPk(courseId);
    if (!course) return res.status(404).send(resWrapper("Course Not Found", 404, null, "Course Id Is Not Valid"));


    const enrollment = await Enrollment.create({ studentId, courseId });
    return res.status(201).send(resWrapper("Enrollment created", 201, enrollment));
}

// const getAllCourses = async (req, res) => {
//     const courses = await Course.findAll({
//         ...includeObj
//     });

//     return res.status(200).send(resWrapper("Courses Reterived", 200, courses))

// }

// const getACourse = async (req, res) => {
//     const id = req.params.id;

//     const course = await Course.findByPk(id, {
//         ...includeObj
//     });

//     if (!course) return res.status(404).send(resWrapper("Course Not Found", 404, null, "Id is not valid"))

//     return res.status(200).send(resWrapper("Courses Reterived", 200, course))

// }

module.exports = { createEnrollment }