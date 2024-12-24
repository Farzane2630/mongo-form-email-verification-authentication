const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(400)
      .json({ success: false, message: "Unauthorized - no token provided" });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken)
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized - Invalid token" });

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
   console.log("error verify token:", error);
   return res
     .status(500)
     .json({ success: false, message: "something went wrong!" });
  }
};


module.exports = verifyToken