const prisma = require("../config/db");

const addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const { content } = req.body;

    //cHECK POST EXISTENCE
    if (!content) {
      return res.status(400).json({
        message: "Comment content is required",
      });
    }

    //create comment
    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        postId,
      },
    });

    return res.status(201).json({
      message: "Comment added",
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//delete comment

const deleteComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    //check comment existence
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Authorization check
    if (comment.userId !== userId) {
      return res.status(403).json({
        message: "You can delete only your own comment",
      });
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    return res.json({
      message: "Comment deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//GET COMMENTS (WITH USER INFO)
const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    //get comments with user info
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { addComment, deleteComment, getComments };
