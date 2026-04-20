const express = require("express");
const router = express.Router();

const {
  createPoll,
  updatePoll,
  getUserPolls,
  deletePoll,
} = require("../controllers/poll.controller");

router.post("/", createPoll);
router.put("/:pollId", updatePoll);
router.get("/user/:userId", getUserPolls);
router.delete("/:pollId", deletePoll);

module.exports = router;
