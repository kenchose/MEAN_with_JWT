const Joi = require('@hapi/joi');

const registerValidation = (user) => {
    let schema = {
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(255)
            .required(),
    };
    return Joi.validate(user, schema);
}

const loginValidation = (user) => {
    let schema = {
        email: Joi.string()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(user, schema)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;