const router = require("express").Router();

const verifyToken = require("../../middlewares/verifyToken");
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  editPost,
  addComment,
  answerComment,
  likePost,
  likeComment
} = require("../controllers/post.controller");
const upload = require("../../middlewares/uploadFile");

router.get("/:limit", getPosts);
router.get("/:postId", getPost);

router.post("/new-post", verifyToken, upload.single("image"), createPost);

router.post(
  "/edit-post/:postId",
  verifyToken,
  upload.single("image"),
  editPost
);

router.delete("/delete-post/:postId", verifyToken, deletePost);

router.post("/like-post/:postId", verifyToken, likePost);
router.post("/like-comment/:commentId", verifyToken, likeComment);

router.post("/add-comment/:postId", verifyToken, addComment);
router.post("/answer-comment/:commentId", verifyToken, answerComment);

module.exports = router;
