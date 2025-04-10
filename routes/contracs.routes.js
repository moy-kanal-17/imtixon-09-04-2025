const express = require("express");
const { createContract, getAllContracts, getContractById, updateContract, deleteContract, getContractsByStatus, cancelContract } = require("../controllers/contract.controller");
const selfGuard = require("../guards/self.guard");
const isAdmin = require("../guards/admin.guard");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/", createContract);
router.get("/",isAdmin,getAllContracts);
router.get("/:id",isAdmin,getContractById);
router.put("/:id",isAdmin,updateContract);
router.delete("/:id",isAdmin,deleteContract);
router.get("/status/:status",isAdmin,getContractsByStatus);
router.put("/cancel/:id",cancelContract);

router.use(authMiddleware)
module.exports = router;
