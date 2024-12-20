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

    // await sendVerificationEmail(newUser.email, verificationToken);

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
    generateTokenAndSetCookie(res, user._id);

    // 7. update last login date

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
const logout = async (req, res) => {
  res.send("logout");
};

module.exports = { login, register, logout, verifyEmail };
