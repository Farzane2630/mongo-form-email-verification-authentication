const express = require("express");
const {
  login,
  register,
  logout,
  verifyEmail,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);

module.exports = router;
