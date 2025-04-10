const express = require("express");
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  Pay,
  deletePayment,
  filters,
} = require("../controllers/payment.controller");
const isClient = require("../guards/client.guard");
const isAdmin = require("../guards/admin.guard");

const router = express.Router();

router.post("/", isClient, createPayment);
router.get("/", isAdmin, getAllPayments);
router.get("n/:id", getPaymentById);
router.put("/:id", Pay);
router.delete("/:id", deletePayment);
router.get("/filter", filters);

module.exports = router;
