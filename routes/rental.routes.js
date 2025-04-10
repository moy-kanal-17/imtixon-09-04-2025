const express = require("express");
const {
  createRental,
  getAllRentals,
  getRentalById,
  updateRental,
  deleteRental,
  cancelRental,
  getdate,
  getTop,
  bizilip_qoldi,
} = require("../controllers/rental.controller");
const isOwner = require("../guards/Owner.guard");
const isAdmin = require("../guards/admin.guard");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");
const { rentSchema } = require("../validations/rent.validation");


const router = express.Router();

router.post("/", validate(rentSchema),isAdmin,createRental);
router.put("/:id", validate(rentSchema), updateRental);


router.post("/cancel/:id",isOwner, cancelRental);
router.get("/",isAdmin, getAllRentals);
router.get("/:id",isOwner, getRentalById);
router.delete("/:id",isOwner, deleteRental);
router.get("/filter/1",isAdmin,getdate)
router.get("/filter/2",isAdmin, getTop);
router.get("/filter/4",bizilip_qoldi)




module.exports = router;
