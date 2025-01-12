const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!req.headers.authorization) {
    const error = new Error("unauthorized user!");
    error.status = 401;
    return next(error);
  }

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

module.exports = verifyToken;
