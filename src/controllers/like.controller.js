const prisma = require("../config/db");

const toggleLike = async (req, res) => {
  try {
    const userId = req.user.id;

    const { postId } = req.params;

    //CHECK EXISTING LIKE

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    //CASE 1: LIKE EXISTS → DELETE (UNLIKE)
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return res.json({
        message: "Post unliked",
      });
    }

    //CASE 2: LIKE NOT EXISTS → CREATE

    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

    return res.json({
      message: "Post liked",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { toggleLike };
