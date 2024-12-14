const Joi = require('joi');

const companySchema = Joi.object({
    company: Joi.object({
        username: Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().required(),
        contact: Joi.string().required()
    }).required()
});


module.exports = { companySchema };