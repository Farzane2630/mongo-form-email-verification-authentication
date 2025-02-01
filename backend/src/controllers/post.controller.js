const { Post, Comment } = require("../models/post.model");
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
    } else {
      user.posts = user.posts.filter((blog) => blog._id != postId);
    }

    await post.deleteOne();
    await user.save();

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

const addComment = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;
  const { body } = req.body;

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found.");
  }

  if (!body) {
    throw new Error("Comment field must not be empty.");
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found!" });
    }
    const comment = await Comment();
    comment.body = body;
    comment.writer = user.name;
    await comment.save();

    post.comments = [...post.comments, comment];
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment added successfully ;)",
      comment,
      post,
    });
  } catch (error) {
    console.log("Error in add comments", error);

    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

const answerComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.userId;
  const { body } = req.body;

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found.");
  }

  if (!body) {
    throw new Error("Comment field must not be empty.");
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found!" });
    }
    const answer = await Comment();
    answer.body = body;
    answer.writer = user.name;
    await answer.save();

    comment.replys = [...comment.replys, answer];
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment added successfully ;)",
      comment,
      answer,
    });
  } catch (error) {
    console.log("Error in add comments", error);

    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

const likePost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not Found!");
    }
    post.likes = post.likes + 1;

    await post.save();

    res.status(200).json({ success: true, message: "Liked ;)", post });
  } catch (error) {
    console.log("Error in like post", error);

    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};
const likeComment = async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("comment not Found!");
    }
    comment.likes = comment.likes + 1;

    await comment.save();

    res.status(200).json({ success: true, message: "Liked ;)", comment });
  } catch (error) {
    console.log("Error in like comment", error);

    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

const savePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found.");
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found.");
    }

    // Check if the post is already saved
    const isPostSaved = user.savedPosts.find(
      (post) => post._id.toString() === postId
    );

    if (isPostSaved) {
      user.savedPosts = user.savedPosts.filter((post) => post._id != postId);

      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Post is unsaved!" });
    }

    // Add the post to the user's saved posts
    user.savedPosts = [...user.savedPosts, post];
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Post saved;)", isSaved: true });
  } catch (error) {
    console.log("Error in save Post", error);

    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  editPost,
  addComment,
  answerComment,
  likePost,
  likeComment,
  savePost,
};
