const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create a poll
const createPoll = async (req, res) => {
  try {
    const { question, userId } = req.body;

    const poll = await prisma.poll.create({
      data: {
        question,
        userId,
      },
    });

    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update poll
const updatePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { question, status, visibility } = req.body;

    const updatedPoll = await prisma.poll.update({
      where: { id: pollId },
      data: {
        question,
        status,
        visibility,
      },
    });
    res.json(updatedPoll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Polls by User
const getUserPolls = async (req, res) => {
  try {
    const { userId } = req.params;
    const polls = await prisma.poll.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Delete Poll
const deletePoll = async (req, res) => {
  try {
    const { pollId } = req.params;

    await prisma.poll.delete({
      where: { id: pollId },
    });

    res.json({ message: "Poll deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPoll,
  updatePoll,
  getUserPolls,
  deletePoll,
};
