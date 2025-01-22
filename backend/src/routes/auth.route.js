const router = require("express").Router();

const {
  login,
  register,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  editProfile,
  editAvatar,
} = require("../controllers/auth.controller");
const verifyToken = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/uploadFile");

router.get("/check-auth", verifyToken, checkAuth);

router.post("/register", register);
router.post("/verify-email", verifyEmail);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/logout", logout);

router.post("/edit-profile", verifyToken, editProfile);
router.post("/edit-avatar", verifyToken,upload.single("avatar"), editAvatar);

module.exports = router;
