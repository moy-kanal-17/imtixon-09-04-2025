const express = require("express");
const {
  createSeller,
  getAllSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
} = require("../controllers/seller.controller");
const selfGuard = require("../guards/self.guard");
const isAdmin = require("../guards/admin.guard");

const router = express.Router();

router.post("/",isAdmin, createSeller);
router.get("/",  getAllSellers);
router.get("/:id", isAdmin, getSellerById);
router.put("/:id", isAdmin, updateSeller); 
router.delete("/:id", isAdmin, deleteSeller); 

module.exports = router;
