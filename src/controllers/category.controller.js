const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const slugify = require("../utils/slugify");

//Create Category
const CreateCategory = async (req, res) => {
  try {
    const { title, parentId } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const slug = slugify(title);
    const url = `/category/${slug}`;

    const category = await prisma.category.create({
      data: {
        title,
        slug,
        url,
        parentId: parentId || null,
      },
    });

    res.status(201).json({
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Get all Category
const getAllCategories = async (req, res) => {
  const { parentId, isActive } = req.query;

  const data = await prisma.category.findMany({
    where: {
      parentId: parentId || undefined,
      isActive: isActive ? isActive === "true" : undefined,
    },
  });

  res.json(data);
};

// NEW: Category Tree API
const getCategoryTree = async (req, res) => {
  const categories = await prisma.category.findMany();

  const buildTree = (parentId = null) => {
    return categories
      .filter((cat) => cat.parentId === parentId)
      .map((cat) => ({
        ...cat,
        children: buildTree(cat.id),
      }));
  };

  const tree = buildTree();
  res.json(tree);
};

// Get by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.category.findUnique({
    where: { id },
  });

  if (!data) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  res.json(data);
};

// ✅ Update
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title, parentId, isActive } = req.body;

  const data = {};

  if (title) {
    data.title = title;
    data.slug = slugify(title);
    data.url = `/category/${data.slug}`;
  }

  if (parentId !== undefined) data.parentId = parentId;
  if (isActive !== undefined) data.isActive = isActive;

  const updated = await prisma.category.update({
    where: { id },
    data,
  });

  res.json(updated);
};

// ✅ Delete
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  await prisma.category.update({
    where: { id },
    data: {
      isActive: false,
    },
  });

  res.json({ message: "Category soft deleted" });
};

module.exports = {
  CreateCategory,
  getAllCategories,
  getCategoryTree,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
