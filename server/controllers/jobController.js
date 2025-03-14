const Job = require("../models/Job");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const { title, company, location, description, salary, type, category, deadline, googleFormLink } = req.body;

    // Validate Google Form Link
    if (!/^https:\/\/docs\.google\.com\/forms\/d\/.+/i.test(googleFormLink)) {
      return res.status(400).json({ error: "Invalid Google Form link. Please provide a valid URL." });
    }

    const job = new Job({
      title,
      company,
      location,
      description,
      salary,
      type,
      category,
      deadline,
      googleFormLink,
      postedBy: req.user.id, // Assuming authentication middleware
    });

    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job", details: error.message });
  }
};

// Get All Jobs (with Pagination)
exports.getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find().populate("postedBy", "name email").skip(skip).limit(limit);
    const total = await Job.countDocuments();

    res.json({ jobs, currentPage: page, totalPages: Math.ceil(total / limit), totalItems: total });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs", details: error.message });
  }
};

// Get Single Job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email");
    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Failed to fetch job", details: error.message });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const { googleFormLink } = req.body;

    // Validate Google Form Link if provided
    if (googleFormLink && !/^https:\/\/docs\.google\.com\/forms\/d\/.+/i.test(googleFormLink)) {
      return res.status(400).json({ error: "Invalid Google Form link. Please provide a valid URL." });
    }

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    Object.assign(job, req.body);
    await job.save();

    res.json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job", details: error.message });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job", details: error.message });
  }
};
