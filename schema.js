const Joi = require('joi');

const companySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  contact: Joi.string().required(),
  address: Joi.string().required(),
  password: Joi.string().required()
});



module.exports = { companySchema };