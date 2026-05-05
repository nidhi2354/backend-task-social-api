const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createPost,
  getAllPosts,
  deletePost,
} = require("../controllers/post.controller");

const { toggleLike } = require("../controllers/like.controller");

const {
  addComment,
  deleteComment,
  getComments,
} = require("../controllers/comment.controller");

router.post("/create", authMiddleware, createPost);

router.get("/", authMiddleware, getAllPosts);

router.post("/like/:postId", authMiddleware, toggleLike);

// Add comment
router.post("/comment/:postId", authMiddleware, addComment);

// Delete comment
router.delete("/comment/:commentId", authMiddleware, deleteComment);

// Get comments of a post
router.get("/comment/:postId", authMiddleware, getComments);

// Delete post
router.delete("/:postId", authMiddleware, deletePost);

module.exports = router;
