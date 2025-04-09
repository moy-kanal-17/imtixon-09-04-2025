const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const config = require("config");

const isAdmin = async (req, res, next) => {
  try {
    // console.log(req.body.role);    
    const token = req.headers.authorization?.split(" ")[1];
    if (!token){return res.status(404).send("BU TOKEN BOLMAYDI!")}
    const decoded = jwt.verify(token, config.get("jwt_secret"));
    // console.log(decoded);
    const { id } = decoded;
    let admin = await Admin.findByPk(id);

    // console.log(admin);
    
    if (!admin) {
      return res.status(404).json({ message: "Admin topilmadi" });
    }

    const role = decoded.role

    console.log(role);    
    if (role !== "admin" && role !== "creator") {
      console.log(role,"👨‍💻");
      
      return res
        .status(403)
        .json({ message: "Bu amalni faqat admin bajarishi mumkin" });
    }

    
    if (!admin) {
      return res.status(404).json({ message: "Admin topilmadi" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Xatolik yuz berdi"});
  }
};

module.exports = isAdmin;
