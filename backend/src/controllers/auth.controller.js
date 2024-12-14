const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie");
const { sendVerificationEmail } = require("../../mailtrap/emails");

const register = async (req, res) => {
  const { name, email, password } = req.body;

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

const login = async (req, res) => {
  res.send("login");
};
const logout = async (req, res) => {
  res.send("logout");
};

module.exports = { login, register, logout };
