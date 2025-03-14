const express = require("express");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getJobs);
router.get("/:id", getJobById);

// Protected Routes (Only Logged-in Users Can Access)
router.post("/", verifyToken, createJob);
router.put("/:id", verifyToken, updateJob);
router.delete("/:id", verifyToken, deleteJob);

module.exports = router;
