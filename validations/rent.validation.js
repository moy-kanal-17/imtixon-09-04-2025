const Joi = require("joi");

const rentSchema = Joi.object({
  title_rent: Joi.string().required().messages({
    "string.empty": "Ijaraning nomi majburiy.",
  }),
  price: Joi.number().integer().min(0).required().messages({
    "number.base": "Narx raqam bo'lishi kerak.",
    "number.min": "Narx 0 dan kam bo'lmasligi kerak.",
  }),
  categories: Joi.string().allow(null, "").messages({
    "string.base": "Kategoriya matn bo'lishi kerak.",
  }),
  discriptions: Joi.string().allow(null, "").messages({
    "string.base": "Tavsif matn bo'lishi kerak.",
  }),
  rental_date: Joi.date().required().messages({
    "date.base": "Ijara sanasi to'g'ri sana bo'lishi kerak.",
  }),
  return_date: Joi.date().allow(null).messages({
    "date.base": "Qaytarish sanasi to'g'ri sana bo'lishi kerak.",
  }),
  total_price: Joi.number().integer().min(0).required().messages({
    "number.base": "Umumiy narx raqam bo'lishi kerak.",
    "number.min": "Umumiy narx 0 dan kam bo'lmasligi kerak.",
  }),
  status: Joi.string()
    .valid("ongoing", "completed", "canceled")
    .default("ongoing"),
  seller_id: Joi.number().integer()
});

module.exports = { rentSchema };
