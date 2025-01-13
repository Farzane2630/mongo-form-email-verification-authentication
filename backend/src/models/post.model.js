const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  readingTime: {
    type: String,
    required: true,
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
