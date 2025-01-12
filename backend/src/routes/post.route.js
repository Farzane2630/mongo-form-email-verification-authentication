const router = require("express").Router();

const { get } = require("mongoose");
const verifyToken = require("../../middlewares/verifyToken");
const {
  createPost,
  getPosts,
  getPost,
} = require("../controllers/post.controller");

router.get("/", getPosts);
router.get("/:postId", getPost);

router.post("/new-post", verifyToken, createPost);

router.put("/edit-post/:postId", (req, res) => {
  const newPost = req.body;

  res.send("post updated" + req.params.postId);
});

router.delete("/delete-post/:postId", (req, res) => {
  res.send("post deleted" + req.params.postId);
});

module.exports = router;