const mongoose = require("mongoose");
const { Post } = require("./post.model");

userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: [],
      default: [],
    },
    savedPosts: {
      type: [],
      default: [],
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    token: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
