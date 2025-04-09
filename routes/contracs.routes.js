const express = require("express");
const router = express.Router();
const contractController = require("../controllers/contract.controller");

router.post("/", contractController.createContract);
router.get("/", contractController.getAllContracts);
router.get("/:id", contractController.getContractById);
router.put("/:id", contractController.updateContract);
router.delete("/:id", contractController.deleteContract);
router.get("/status/:status", contractController.getContractsByStatus);
router.put("/cancel/:id", contractController.cancelContract);

module.exports = router;
