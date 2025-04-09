const express = require("express");
const router = express.Router();
const config = require("config");
const db = require("../config/db.js");

const rentalRoutes = require("./rental.routes.js");
const authRoutes = require("./auth.routes.js");
const sellerRoutes = require("./seller.routes.js");
const customerRoutes = require("./customer.routes.js");
const adminRoutes = require("./admin.routes");
const contractRoutes = require("./contracs.routes");
const passportRoutes = require("./passport.routes");
const canceledRoutes = require("./canseled.routes");
const companiyRoutes = require("./company.routes.js")
const paymentRoutes = require("./payments.routes.js")
const { sequelize } = db;






router.use("/payments",paymentRoutes)
router.use("/companiy",companiyRoutes)
router.use("/seller", sellerRoutes);
router.use("/contract", contractRoutes);
router.use("/canceled", canceledRoutes);
router.use("/rental", rentalRoutes);
router.use("/auth", authRoutes);
router.use("/customer", customerRoutes);
router.use("/passport", passportRoutes);
router.use("/admin", adminRoutes);


module.exports = router;