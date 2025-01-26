const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");

const createPost = async (req, res) => {
  console.log("file", req.file);
  console.log("text", req.body);

  const { title, category, body, readingTime } = req.body;

  const user = await User.findById(req.userId).select("-password");

  try {
    // check for required fields
    if (!title || !category || !body || !readingTime) {
      throw new Error("All fields are required");
    }
    const newPost = new Post({
      title,
      category,
      body,
      image: `images/${req.file.filename}`,
      readingTime,
      author: user.name,
    });

    await newPost.save();
    user.posts = [...user.posts, newPost];

    await user.save();

    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPosts = async (req, res) => {
  const limit = parseInt(req.params.limit);
  try {
    const posts = await Post.find().sort({ publishDate: -1 }).limit(limit);
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getPost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }
    const user = await User.findById(userId).select("-password");
    const usersPost = user.posts.find((blog) => blog._id == postId);
    if (!usersPost) {
      throw new Error(
        "You are not the author. You cannot delete or edit this post."
      );
    }

    await post.deleteOne();

    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const editPost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;

  const { title, category, body, readingTime } = req.body;
  const image = req.file;

  if (!title || !category || !body || !image || !readingTime) {
    throw new Error("All fields are required");
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const user = await User.findById(userId).select("-password");
  const usersPost = user.posts.find((blog) => blog._id == postId);
  if (!usersPost) {
    throw new Error(
      "You are not the author. You cannot delete or edit this post."
    );
  }

  try {
    post.title = title;
    post.category = category;
    post.body = body;
    post.image = `images/${image.filename}`;
    post.readingTime = readingTime;
    post.lastUpdate = Date.now();

    await post.save();
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createPost, getPosts, getPost, deletePost, editPost };
