const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = async (res, userId) => {
  const token = jwt.sign(
    { userId }, 
    process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

module.exports = {generateTokenAndSetCookie};
