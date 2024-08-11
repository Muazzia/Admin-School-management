const express = require("express");
const attendanceRouter = express.Router();

const { createAttendance, getAllAttendance, getAAttendance, updateAttendance, getAllAttendanceOfACourse, getAllAttendanceOfAStudentWithCourse, getAllAttendanceOfAStudent, getUniqueStudnetInQuater } = require("../controllers/attendance");


attendanceRouter.get("/", getAllAttendance);
attendanceRouter.get("/:id", getAAttendance);

attendanceRouter.post("/", createAttendance);

attendanceRouter.put("/:id", updateAttendance);
attendanceRouter.delete("/:id",);


// get All attendance of A Course
attendanceRouter.get("/course/:courseId", getAllAttendanceOfACourse)

// get All attendance Of A Student With A Course
attendanceRouter.get("/course/:courseId/student/:studentId", getAllAttendanceOfAStudentWithCourse)


// get All attendance of a Student
attendanceRouter.get("/student/:studentId", getAllAttendanceOfAStudent)

// get Uniquer Students In A Quater
attendanceRouter.get("/unique-student/:quater", getUniqueStudnetInQuater)



module.exports = attendanceRouter;