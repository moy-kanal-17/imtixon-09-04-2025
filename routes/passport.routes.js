const express = require("express");
const {
  createPassport,
  getAllPassports,
  getPassportById,
  updatePassport,
  deletePassport,
} = require("../controllers/passport.controller");
const isAdmin = require("../guards/admin.guard");

const router = express.Router();

router.post("/", createPassport);
router.get("/", isAdmin, getAllPassports);
router.get("/:id", isAdmin, getPassportById);
router.put("/:id", updatePassport);
router.delete("/:id", deletePassport);

module.exports = router;
