const Joi = require("joi");

const adminValidationSchema = Joi.object({
  full_name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Ism va familiya majburiy.",
    "string.min": "Ism va familiya kamida 3 ta belgidan iborat bo'lishi kerak.",
    "string.max": "Ism va familiya 100 ta belgidan oshmasligi kerak.",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email majburiy.",
    "string.email": "Email noto'g'ri formatda.",
  }),

  password: Joi.string().min(8).max(128).required().messages({
    "string.empty": "Parol majburiy.",
    "string.min": "Parol kamida 8 ta belgidan iborat bo'lishi kerak.",
    "string.max": "Parol 128 ta belgidan oshmasligi kerak.",
  }),

  role: Joi.string().valid("creator", "admin").required().messages({
    "string.empty": "Rol majburiy.",
    "any.only": "Rol faqat 'creator' yoki 'admin' bo'lishi kerak.",
  }),

  accessToken: Joi.string()
    .pattern(/^[a-zA-Z0-9-_.]+$/)
    .allow(null)
    .messages({
      "string.pattern.base":
        "Access token faqat harf, raqam, tire, pastki chiziq va nuqtalardan iborat bo'lishi mumkin.",
    }),

  refreshToken: Joi.string()
    .pattern(/^[a-zA-Z0-9-_.]+$/)
    .allow(null)
    .messages({
      "string.pattern.base":
        "Refresh token faqat harf, raqam, tire, pastki chiziq va nuqtalardan iborat bo'lishi mumkin.",
    }),
});

module.exports = adminValidationSchema;
