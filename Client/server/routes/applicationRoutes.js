const express = require("express");
const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");

const router = express.Router();

// API Route to get all applications for a specific job
router.get("/jobs/:jobId/applications", async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('jobId') // Populating the Job details
      .populate('userId'); // Populating the User details (candidate)
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// API Route to post an application for a job
router.post("/jobs/:jobId/applications", async (req, res) => {
  const { userId } = req.body; // The ID of the user applying
  const { jobId } = req.params; // The ID of the job

  // Ensure the job exists
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(400).json({ error: "Job not found" });
  }

  // Ensure the user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    const newApplication = new Application({
      jobId,
      userId,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully", application: newApplication });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit application" });
  }
});

// API Route to update the status of an application
router.put("/applications/:id", async (req, res) => {
  const { status } = req.body;
  if (!['Pending', 'Reviewed', 'Accepted', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ message: "Application status updated successfully", application: updatedApplication });
  } catch (error) {
    res.status(500).json({ error: "Failed to update application status" });
  }
});

// API Route to delete an application
router.delete("/applications/:id", async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete application" });
  }
});

module.exports = router;
