const express = require("express");
const {
  login,
  register,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/logout", logout);

module.exports = router;
