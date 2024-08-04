const CourseCategory = require("../models/courseCategoryModel");
const CourseImage = require("../models/courseImageModel");
const Course = require("../models/courseModel");

// // Course with CourseImage 1->M

Course.hasMany(CourseImage, { foreignKey: "courseId", as: "images" });
CourseImage.belongsTo(Course, { foreignKey: "courseId" })

// Course with Category 1-> 1   1<-M

Course.belongsTo(CourseCategory, { foreignKey: "categoryId" });
CourseCategory.hasMany(Course, { foreignKey: "categoryId" });