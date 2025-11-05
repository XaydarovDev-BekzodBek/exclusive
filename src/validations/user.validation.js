const Joi = require("joi");

const RegisterUserValidation = Joi.object({
  name: Joi.string().required(),
  identify: Joi.string().required(),
  password: Joi.string().required(),
});

const LoginUserValidation = Joi.object({
  identify: Joi.string().required(),
  password: Joi.string().required(),
});

const UserEditValidation = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^\+998(33|55|77|88|90|91|93|94|95|97|98|99)\d{7}$/,
  ),
  address: Joi.string(),
  current_password: Joi.string(),
  new_password: Joi.string(),
});

module.exports = {
  RegisterUserValidation,
  LoginUserValidation,
  UserEditValidation,
};
