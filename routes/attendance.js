const express = require("express");
const attendanceRouter = express.Router();

const { createAttendance, getAllAttendance, getAAttendance, updateAttendance, getAllAttendanceOfACourse, getAllAttendanceOfAStudentWithCourse } = require("../controllers/attendance");


attendanceRouter.get("/", getAllAttendance);
attendanceRouter.get("/:id", getAAttendance);

attendanceRouter.post("/", createAttendance);

attendanceRouter.put("/:id", updateAttendance);
attendanceRouter.delete("/:id",);


// get All attendance of A Course
attendanceRouter.get("/course/:courseId", getAllAttendanceOfACourse)

// get All attendance Of A Student With A Course
attendanceRouter.get("/course/:courseId/student/:studentId", getAllAttendanceOfAStudentWithCourse)




module.exports = attendanceRouter;