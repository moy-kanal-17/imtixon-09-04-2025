const Admin = require("../models/admin");

const isCreator = async (req, res, next) => {
  try {
    if (req.user.role !== "creator") {
      return res
        .status(403)
        .json({ message: "Bu amalni faqat creator bajarishi mumkin" });
    }

    const creator = await Creator.findByPk(req.user.id);
    if (!creator) {
      return res.status(404).json({ message: "Creator topilmadi" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};

module.exports = isCreator;
