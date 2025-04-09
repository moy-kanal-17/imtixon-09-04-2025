const jwt = require("jsonwebtoken");
const config = require("config");
const logger = require("./logger");

const Admin = require("../models/admin");
const Seller = require("../models/seller");
const Customer = require("../models/customer");

const authMiddleware = async (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token talab qilinadi" });
    }
    const decoded = jwt.verify(token, config.get("jwt_secret"));
    // console.log(decoded);
    
   let { role }= decoded;
    // console.log(role);
    // console.log(decoded.id);
    
    
    let user;
    if (role === "admin") {
      user = await Admin.findByPk(decoded.id);
    } else if (role === "seller") {
      user = await Seller.findByPk(decoded.id);
    } else if (role === "customer") {
      user = await Customer.findByPk(decoded.id);
    }
    else if (role === "creator") {
      user = await Admin.findByPk(decoded.id);
    }
    
    
    console.log(user.id);
    
    if (!user) {
      logger.error("User not found");
      console.log("User not found👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻 ");
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    req.user = {...user, role,id:user.id};
    // console.log(req.user);
    // console.log(decoded);
        

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token noto'g'ri yoki muddati o'tgan" });
  }
};

module.exports = authMiddleware;
