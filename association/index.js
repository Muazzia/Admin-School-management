const CourseCategory = require("../models/courseCategoryModel");
const CourseImage = require("../models/courseImageModel");
const Course = require("../models/courseModel");
const Enrollment = require("../models/enrollment");
const Student = require("../models/studentModel");

// // Course with CourseImage 1->M

Course.hasMany(CourseImage, { foreignKey: "courseId", as: "images" });
CourseImage.belongsTo(Course, { foreignKey: "courseId" })

// Course with Category 1-> 1   1<-M

Course.belongsTo(CourseCategory, { foreignKey: "categoryId" });
CourseCategory.hasMany(Course, { foreignKey: "categoryId" });



// Student has many courses through enrollment
Student.belongsToMany(Course, { through: Enrollment, foreignKey: "studentId" });
// Course has many students through enrollment
Course.belongsToMany(Student, { through: Enrollment, foreignKey: "courseId" });


Enrollment.belongsTo(Student, { foreignKey: 'studentId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

