const sequelize = require("../database")
const { DataTypes } = require("sequelize")

const Student = sequelize.define("Student", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lasName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sourceOfIncome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false
    },
    class: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

})


module.exports = Student;
