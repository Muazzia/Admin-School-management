const sequelize = require("../database");
const { DataTypes } = require("sequelize");
const Course = require("./courseModel");

const CourseImage = sequelize.define("CourseImage", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course,
            key: "id"
        }
    }
}, {
    timestamps: false
})


module.exports = CourseImage