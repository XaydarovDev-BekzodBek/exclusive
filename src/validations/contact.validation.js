const Joi = require("joi");

const CreateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  message: Joi.string(),
  phone: Joi.string().pattern(
    /^\+998(33|55|77|88|90|91|93|94|95|97|98|99)\d{7}$/
  ),
});

module.exports = { CreateContactSchema };
