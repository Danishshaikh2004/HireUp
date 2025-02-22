const express = require("express");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getCourses);
router.get("/:id", getCourseById);

// Protected Routes (Only Logged-in Users Can Access)
router.post("/", verifyToken, createCourse);
router.put("/:id", verifyToken, updateCourse);
router.delete("/:id", verifyToken, deleteCourse);

module.exports = router;
