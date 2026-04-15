const prisma = require("../config/db");

//create post
const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    //VALIDATION
    if (!content) {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    const userId = req.user.id;

    //CREATE POST IN DB
    const post = await prisma.post.create({
      data: {
        content,
        authorId: userId,
      },
    });
    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get all posts
const getAllPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        likes: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    //format posts
    const formattedPosts = posts.map((post) => {
      return {
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,

        author: post.author,

        likeCount: post.likes.length,
        commentCount: post.comments.length,

        isLiked: post.likes.some((like) => like.userId === userId),
      };
    });

    return res.json({
      posts: formattedPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//delete post
const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    // check post exist
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // authorization check
    if (post.authorId !== userId) {
      return res.status(403).json({
        message: "You can delete only your own post",
      });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { createPost, getAllPosts, deletePost };
