const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create a poll
const createPoll = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user.id;

    const poll = await prisma.poll.create({
      data: {
        question,
        userId,
      },
    });

    res.status(201).json({
      message: "poll created successfully",
      poll,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error ",
    });
  }
};

//update poll
const updatePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { question, status, visibility } = req.body;

    const updatedPoll = await prisma.poll.update({
      where: {
        id: pollId,
        userId: userId,
      },
      data: {
        question,
        status,
        visibility,
      },
    });
    res.status(200).json({
      message: "updated successfully poll",
      updatedPoll,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get Polls by User
const getUserPolls = async (req, res) => {
  try {
    const userId = req.user.id;
    const polls = await prisma.poll.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      message: "successfully getUserPolls",
      polls,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//Delete Poll
const deletePoll = async (req, res) => {
  try {
    const { pollId } = req.params;

    await prisma.poll.delete({
      where: {
        id: pollId,
        userId: userId,
      },
    });

    res.status(200).json({
      message: "successfully deleted poll",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createPoll,
  updatePoll,
  getUserPolls,
  deletePoll,
};
