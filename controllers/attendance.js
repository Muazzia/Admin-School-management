const { validateCreateAttendance, validateUpdateAttendance } = require("../joischemas/attendance");
const { resWrapper } = require("../utils");

const Enrollment = require("../models/enrollment");
const Attendance = require("../models/attendance")
const Student = require("../models/studentModel");
const Course = require("../models/courseModel");
const { Op } = require("sequelize");
const CourseImage = require("../models/courseImageModel");
const CourseCategory = require("../models/courseCategoryModel");

const includeObj = {
    include: [
        {
            model: Enrollment, as: "enrollment", include: [
                { model: Student, as: "student" },
                {
                    model: Course, as: "course", include: [
                        {
                            model: CourseImage, as: "images", attributes: {
                                exclude: ["courseId"]
                            }
                        },
                        {
                            model: CourseCategory, as: "category"
                        }
                    ]
                }
            ]
        }
    ]
}

const createAttendance = async (req, res) => {
    const { error, value: { enrollmentId, date, isPresent } } = validateCreateAttendance(req.body)
    if (error) return res.status(400).send(resWrapper(error.message, 400, null, error.message));

    const enrollment = await Enrollment.findByPk(enrollmentId);
    if (!enrollment) return res.status(404).send(resWrapper("Enrollment Not Found", 404, null, "Enrollment Id Is Not Valid"));


    const oldAttendace = await Attendance.findOne({
        where: {
            enrollmentId: enrollmentId,
            date: date
        }
    })
    if (oldAttendace) return res.status(400).send(resWrapper("Attendance Is Already Taken", 400, null, "Can't Take Alreay Taken Attendance"))

    const attendance = await Attendance.create({ enrollmentId, date, isPresent });

    const temp = await Attendance.findByPk(attendance.id, {
        ...includeObj
    })

    return res.status(201).send(resWrapper("Enrollment created", 201, temp));
}

const getAllAttendance = async (req, res) => {
    const attendance = await Attendance.findAll({ ...includeObj });
    return res.status(200).send(resWrapper("All Enrollments", 200, attendance));
}

const getAAttendance = async (req, res) => {
    const id = req.params.id;

    const attendance = await Attendance.findByPk(id, {
        ...includeObj
    });
    if (!attendance) return res.status(404).send(resWrapper("Attendance Not Found", 404, null, "Id Is Not Valid"));

    return res.status(200).send(resWrapper("Enrollment Reterived", 200, attendance))
}

const updateAttendance = async (req, res) => {
    const id = req.params.id;

    const { error, value } = validateUpdateAttendance(req.body);
    if (error) return res.status(400).send(resWrapper(error.message, 400, null, error.message))

    const attendance = await Attendance.findByPk(id, { ...includeObj });
    if (!attendance) return res.status(404).send(resWrapper("Attendance Not Found", 404, null, "Id Is Not Valid"));

    await attendance.update({ ...value });

    return res.status(200).send(resWrapper("Updated", 200, attendance))

}

const getAllAttendanceOfACourse = async (req, res) => {
    const courseId = req.params.courseId;

    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).send(resWrapper("Course Not Found", 404, null, "Course Id Is Not Valid"));

    const attendance = await Attendance.findAll({
        include: [
            {
                model: Enrollment, as: "enrollment", where: {
                    courseId
                },
                include: [
                    { model: Student, as: "student" },
                    { model: Course, as: "course" }
                ]
            }
        ]
    });

    return res.status(200).send(resWrapper("All Attendances", 200, attendance))
}

const getAllAttendanceOfAStudentWithCourse = async (req, res) => {
    const { startDate, endDate } = req.query;

    let dateQuery = {};
    if (startDate && endDate) {
        dateQuery.where = {
            date: {
                [Op.between]: [startDate, endDate]
            }
        }
    } else if (startDate) {
        dateQuery.where = {
            date: {
                [Op.gte]: startDate
            }
        }
    } else if (endDate) {
        dateQuery.where = {
            date: {
                [Op.lte]: endDate
            }
        }
    } else {
        dateQuery.where = {
            date: {
                [Op.lte]: new Date()
            }
        }
    }
    const courseId = req.params.courseId;
    const studentId = req.params.studentId;

    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).send(resWrapper("Course Not Found", 404, null, "Course Id Is Not Valid"));

    const student = await Student.findByPk(studentId);
    if (!student) return res.status(404).send(resWrapper("Student Not Found", 404, null, "Student Id Is Not Valid"));

    const attendance = await Attendance.findAll({
        include: [
            {
                model: Enrollment, as: "enrollment", where: {
                    courseId,
                    studentId
                },
                include: [
                    { model: Student, as: "student" },
                    { model: Course, as: "course" }
                ]
            }
        ],
        ...dateQuery
    });

    return res.status(200).send(resWrapper("All Attendances", 200, attendance))
}

// const deleteAEnrollment = async (req, res) => {
//     const id = req.params.id;

//     const enrollment = await Enrollment.findByPk(id, {
//         ...includeObj
//     });
//     if (!enrollment) return res.status(404).send(resWrapper("Enrollment Not Found", 404, null, "Id Is Not Valid"));

//     await enrollment.destroy();

//     return res.status(200).send(resWrapper("Enrollment Deleted", 200, enrollment));
// }

module.exports = { createAttendance, getAllAttendance, getAAttendance, updateAttendance, getAllAttendanceOfACourse, getAllAttendanceOfAStudentWithCourse }