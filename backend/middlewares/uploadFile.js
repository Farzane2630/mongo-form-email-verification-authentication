const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../images");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Create directory if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Add a timestamp to the filename for uniqueness
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

module.exports = upload;
