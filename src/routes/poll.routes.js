const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

const createPollLimiter = require("../middleware/rateLimiter");

const {
  createPoll,
  updatePoll,
  getUserPolls,
  deletePoll,
} = require("../controllers/poll.controller");

router.post("/", authMiddleware, createPollLimiter, createPoll);
router.put("/:pollId", authMiddleware, createPollLimiter, updatePoll);
router.get("/user/:userId", authMiddleware, createPollLimiter, getUserPolls);
router.delete("/:pollId", authMiddleware, createPollLimiter, deletePoll);

module.exports = router;
