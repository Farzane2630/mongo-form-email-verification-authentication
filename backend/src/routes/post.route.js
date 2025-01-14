const router = require("express").Router();

const { get } = require("mongoose");
const verifyToken = require("../../middlewares/verifyToken");
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  editPost,
} = require("../controllers/post.controller");

router.get("/:limit", getPosts);
router.get("/:postId", getPost);

router.post("/new-post", verifyToken, createPost);

router.put("/edit-post/:postId", editPost);

router.delete("/delete-post/:postId", deletePost);

module.exports = router;
