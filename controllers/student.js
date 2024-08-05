const { resWrapper } = require("../utils");
const Student = require("../models/studentModel");
const { validateCreateStudent } = require("../joischemas/student");


const createStudent = async (req, res) => {
    const { error, value } = validateCreateStudent(req.body)
    if (error) return res.status(400).send(resWrapper(error.message, 400, null, error.message));

    const prevStudent = await Student.findOne({
        where: {
            email: value.email
        }
    })
    if (prevStudent) return res.status(400).send(resWrapper("Student With Email Already Exist", 400, null, "Email Is Not Valid"))


    const student = await Student.create({ ...value });
    return res.status(201).send(resWrapper("Enrollment created", 201, student));
}

const getAllStudents = async (req, res) => {
    const students = await Student.findAll();

    return res.status(200).send(resWrapper("All Students", 200, students));
}

const getAStudent = async (req, res) => {
    const id = req.params.id;

    const student = await Student.findOne({ where: { id } });
    if (!student) return res.status(404).send(resWrapper("Student Not Found", 404, null, "Id Is Not Valid"));

    return res.status(200).send(resWrapper("Student Reterived", 200, student));
}

const deleteAStudent = async (req, res) => {
    const id = req.params.id;
    const student = await Student.findOne({ where: { id } });
    if (!student) return res.status(404).send(resWrapper("Student Not Found", 404, null, "Id Is Not Valid"));

    await student.destroy();

    return res.status(200).send(resWrapper("Student Deleted", 200, student));
}


module.exports = { createStudent, getAllStudents, getAStudent, deleteAStudent }