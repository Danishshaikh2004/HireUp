const express = require("express");
const {
  createInternship,
  getInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
} = require("../controllers/internshipController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getInternships);
router.get("/:id", getInternshipById);

// Protected Routes (Only Logged-in Users Can Access)
router.post("/", verifyToken, createInternship);
router.put("/:id", verifyToken, updateInternship);
router.delete("/:id", verifyToken, deleteInternship);

module.exports = router;
