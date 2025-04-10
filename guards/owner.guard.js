const Seller = require("../models/seller");

const isOwner = async (req, res, next) => {
  try {
    console.log(req.user);
    
    if (req.user.role !== "seller") {
      return res
        .status(403)
        .json({ message: "Bu amalni faqat owner bajarishi mumkin" });
    }

    const owner = await Seller.findByPk(req.user.id);
    if (!owner) {
      return res.status(404).json({ message: "Owner topilmadi" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Xatolik yuz berdi", error });
  }
};

module.exports = isOwner;
