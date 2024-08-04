const Joi = require("joi")

const createCourseSchema = Joi.object({
    title: Joi.string().required().max(255),
    description: Joi.string().required().max(500),
    status: Joi.string().validate('Published', 'Draft', 'Inactive'),
    categoryId: Joi.number().required()
});

const validateCreateCourse = (body) => createCourseSchema.validate(body);



module.exports = {
    validateCreateCourse
}