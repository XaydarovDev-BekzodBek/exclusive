const Joi = require("joi");

const CreateAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const LoginAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { LoginAdminSchema, CreateAdminSchema };
