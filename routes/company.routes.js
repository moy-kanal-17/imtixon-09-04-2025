const express = require("express");
const router = express.Router();
const { createCompaniy, getAllCompaniys, getCompaniyById, updateCompaniy, deleteCompaniy } = require("../controllers/companiy.controller");
const validate = require("../middleware/validate");
const { companiySchema } = require("../validations/companiy.validation.js");

router.post("/",validate(companiySchema), createCompaniy);
router.get("/", getAllCompaniys);
router.get("/:id", getCompaniyById);
router.put("/:id", validate(companiySchema), updateCompaniy);
router.delete("/:id", deleteCompaniy);

module.exports = router;
