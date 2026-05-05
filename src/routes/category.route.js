const express = require("express");

const router = express.Router();

const {
  CreateCategory,
  getAllCategories,
  getCategoryTree,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.post("/", CreateCategory);
router.get("/", getAllCategories);
router.get("/tree", getCategoryTree);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
