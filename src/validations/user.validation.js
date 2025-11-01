const Joi = require("joi");

const RegisterUserValidation = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
});

module.exports = { RegisterUserValidation };
