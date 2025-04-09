const express = require("express");
const { login, logout, refreshToken, sendOtpToUser, editpassword, registration } = require("../controllers/auth.controller");
const authenticateUser = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/login",login);

router.post('/login_admin',login)

router.post("/login_owner", login);

router.post("/registration",registration)

router.post("/logout",authenticateUser, logout);

router.post("/refresh", authenticateUser,refreshToken);

router.post("/otp",sendOtpToUser)

router.post("/editpassword",authenticateUser,editpassword)


module.exports = router;
