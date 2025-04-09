const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");
const isAdmin = require("../guards/admin.guard");
const selfGuard = require("../guards/self.guard");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", isAdmin, createCustomer);
router.get("/", getAllCustomers);
router.get("/:id", isAdmin, getCustomerById);
router.put("/:id", selfGuard, updateCustomer);
router.delete("/:id", isAdmin, deleteCustomer);

module.exports = router;
