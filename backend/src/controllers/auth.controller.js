const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const { User } = require("../models/user.model");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie");
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendSuccessfullyResetPasword,
} = require("../../mailSender/emails");

const register = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    // check for required fields
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    // check if the user is already exists
    const alreadyRegisteredUser = await User.findOne({ email });

    if (alreadyRegisteredUser) {
      return res.status(400).json({
        succuss: false,
        message: "There is already an account with this email.",
      });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 15);
    // creating a random verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await newUser.save();

    //jwt
    generateTokenAndSetCookie(res, newUser._id);

    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid incredentials." });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error verifying email:", error);
    return res
      .status(500)
      .json({ success: false, message: "something went wrong!" });
  }
};

const login = async (req, res) => {
  // 1. get email and password from client
  const { email, password } = req.body;
  try {
    // 2. check if email is registered
    const user = await User.findOne({ email });

    // 3. send error if user does not exist
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid incredentials." });
    }

    //4. check password match
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // 5. if password does not match send error
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid incredentials." });
    }

    // 6. generate token and cookie
    const token = await generateTokenAndSetCookie(res, user._id);
    console.log(token);

    // 7. update last login date

    user.token = token;
    user.lastLogin = new Date();

    // 8. save user in db
    await user.save();

    // 9. return a response
    res.status(200).json({
      success: true,
      message: "user successfully loged in ;)",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error logging in:", error); // This is for debug purpos, don`t delete it miss. DELETYYYYY
    return res
      .status(500)
      .json({ success: false, message: "something went wrong!" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset token sent successfully",
    });
  } catch (error) {
    console.log("error forgot password:", error);
    return res
      .status(500)
      .json({ success: false, message: "something went wrong!" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendSuccessfullyResetPasword(user.email);
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully!" });
  } catch (error) {
    console.log("error verifying email:", error);
    return res
      .status(500)
      .json({ success: false, message: "something went wrong!" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User loged out successfully." });
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // not include password
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid incredentials." });
    }

    res.status(200).json({
      success: true,
      message: "user is authenticated ;)",
      user,
    });
  } catch (error) {
    console.log("error in checkAuth:", error);
    return res
      .status(500)
      .json({ success: false, message: "something went wrong!" });
  }
};

const editProfile = async (req, res) => {
  const { name, password, mobile } = req.body;
  const avatar = req.file;

  if (!name || !password || !mobile) {
    throw new Error("All fields are required");
  }

  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.name = name;
    user.mobile = mobile;
    if (avatar) {
      user.avatar = `images/${avatar.filename}`;
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: "profile updated successfully!",
      user,
    });
  } catch (error) {
    console.log("error in editProfile:", error);
    return res
      .status(500)
      .json({ success: false, message: "something went wrong!" });
  }
};

module.exports = {
  login,
  register,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  editProfile,
  // editAvatar,
};
