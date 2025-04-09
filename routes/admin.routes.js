const express = require("express");
const {
  createAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
} = require("../controllers/admin.controller");
const isCreator = require("../guards/creator.guard");
const isAdmin = require("../guards/admin.guard");
const validate = require("../middleware/validate");
const adminValidationSchema = require("../validations/admin.validation");
const router = express.Router();

router.post("/",validate(adminValidationSchema), createAdmin,isCreator);

router.get("/",getAllAdmins,isAdmin)

router.get("/:id", getAdminById,isAdmin);

router.put("/:id", validate(adminValidationSchema), updateAdmin, isCreator);

router.delete("/:id", isCreator, deleteAdmin);

module.exports = router;
