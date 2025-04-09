const Client  = require("../models/customer");

const isClient = async (req, res, next) => {
  try {
    if (req.user.role !== "customer") {
      return res
        .status(403)
        .json({ message: "Bu amalni faqat client bajarishi mumkin" });
    }

    const client = await Client.findByPk(req.user.id);
    if (!client) {
      return res.status(404).json({ message: "Client topilmadi" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};

module.exports = isClient;
