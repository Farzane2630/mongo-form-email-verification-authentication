const router = require("express").Router();

const verifyToken = require("../../middlewares/verifyToken");
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  editPost,
} = require("../controllers/post.controller");
const upload = require("../../middlewares/uploadFile");


router.get("/:limit", getPosts);
router.get("/:postId", getPost);

router.post("/new-post", verifyToken, upload.single("image"), createPost);

router.put("/edit-post/:postId", editPost);

router.delete("/delete-post/:postId", deletePost);

module.exports = router;
