const express = require("express");
const {
  login,
  register,
  logout,
  verifyEmail,
  forgotPassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

module.exports = router;
