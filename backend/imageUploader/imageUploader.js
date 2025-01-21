const mongoose = require("mongoose");
// const multer = require("multer");
const upload = require("../middlewares/uploadFile");
const express = require("express");
const { User } = require("../src/models/user.model");


const router = express.Router();

const imgSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Image", imgSchema);

const postImg = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).send({ message: "Please upload an image" });
    }

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Save the uploaded file path in the user's avatar field
    user.avatar = `images/${req.file.filename}`; // Save relative path
    await user.save();

    res.status(200).send({ message: "Avatar uploaded successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error uploading avatar" });
  }
};

router.post("/upload/:userId", upload.single("avatar"), postImg);

module.exports = router;
