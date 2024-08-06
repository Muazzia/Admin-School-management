const Joi = require("joi")


const createAttendanceSchema = Joi.object({
    enrollmentId: Joi.number().required(),
    date: Joi.string()
        .isoDate().allow(null)
        .messages({
            'string.isoDate': 'dob must be a valid ISO date(YYYY-MM-DD)',
        }).required(),
    isPresent: Joi.boolean().required()
});

const validateCreateAttendance = (body) => createAttendanceSchema.validate(body);


const updateAttendanceSchema = Joi.object({
    date: Joi.string()
        .isoDate().allow(null)
        .messages({
            'string.isoDate': 'dob must be a valid ISO date(YYYY-MM-DD)',
        }),
    isPresent: Joi.boolean()
})

const validateUpdateAttendance = (body) => updateAttendanceSchema.validate(body)


module.exports = { validateCreateAttendance, validateUpdateAttendance }