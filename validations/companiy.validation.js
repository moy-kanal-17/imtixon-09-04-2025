const Joi = require("joi");

const companiySchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  companiy_email: Joi.string().email().required(),
  address: Joi.string().required(),
});

module.exports = { companiySchema };
