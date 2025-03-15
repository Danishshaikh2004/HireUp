require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors({ origin: "*" })); // Allow all domains (change to frontend URL in production)
app.use(express.json()); // Enable JSON parsing

// ✅ MongoDB Connection (Using .env for Railway & MongoDB Atlas)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

console.log("🔍 MongoDB URI:", process.env.MONGO_URI);

// Import Models
const Course = require("./models/Courses");
const Internship = require("./models/Internship");
const Job = require("./models/Job");

// ✅ Fetch all Jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// ✅ Fetch all Internships (Fixed variable name)
app.get("/api/internships", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (error) {
    console.error("❌ Error fetching internships:", error);
    res.status(500).json({ error: "Failed to fetch internships" });
  }
});

// ✅ Fetch all Courses (Fixed variable name)
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// ✅ Fetch Specific Job by ID (Includes ID validation)
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Job ID" });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("❌ Error fetching job details:", error);
    res.status(500).json({ error: "Failed to fetch job details" });
  }
});

// ✅ Fetch Specific Internship by ID
app.get("/api/internships/:id", async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ error: "Internship not found" });
    }
    res.json(internship);
  } catch (error) {
    console.error("❌ Error fetching internship:", error);
    res.status(500).json({ error: "Failed to fetch internship details" });
  }
});

// ✅ Fetch Specific Course by ID
app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error("❌ Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course details" });
  }
});

// ✅ Post a New Job
app.post("/api/jobs", async (req, res) => {
  console.log("🔍 Received Job Data:", req.body);

  const { title, company, description, location, type, category, deadline, googleFormLink } = req.body;

  if (!title || !company || !description || !location || !type || !category || !deadline || !googleFormLink) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newJob = new Job({
      title,
      company,
      description,
      location,
      type,
      category,
      deadline,
      googleFormLink,
      postedAt: new Date(),
    });

    await newJob.save();
    res.status(201).json({ message: "✅ Job posted successfully!", job: newJob });
  } catch (error) {
    console.error("❌ Error saving job:", error);
    res.status(500).json({ error: "Failed to post job" });
  }
});

// ✅ Update Job by ID
app.put("/api/jobs/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Job ID format" });
  }

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "✅ Job updated successfully!", job: updatedJob });
  } catch (error) {
    console.error("❌ Update Error:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
});

// ✅ Delete Job by ID
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json({ message: "✅ Job deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

// ✅ Fetch Applications from MongoDB & Google Forms

const GOOGLE_FORMS_JOBS_URL = "https://script.google.com/macros/s/AKfycbwuaZ5l4C_74_iIOge8QY4FObieCO_sNKv7BvQrXORJgH67ei0Xx7bcbdClBM8R7h0Z/exec";
const GOOGLE_FORMS_INTERNSHIPS_URL = "https://script.google.com/macros/s/AKfycbyuBKbTwVGuNXQCDR2QzulbYhLVMtG2YDrq9l-tyUgYjJGeChh8WA4EgsIuiSf5xiD3eg/exec";

app.get("/api/all-applications", async (req, res) => {
  try {
    const jobApplications = await Job.find();
    const internshipApplications = await Internship.find();

    let jobsGoogleData = [];
    let internshipsGoogleData = [];

    try {
      const jobsGoogleResponse = await axios.get(GOOGLE_FORMS_JOBS_URL);
      jobsGoogleData = Array.isArray(jobsGoogleResponse.data) ? jobsGoogleResponse.data : [];
    } catch (err) {
      console.error("❌ Error fetching Google Jobs:", err.message);
    }

    try {
      const internshipsGoogleResponse = await axios.get(GOOGLE_FORMS_INTERNSHIPS_URL);
      internshipsGoogleData = Array.isArray(internshipsGoogleResponse.data) ? internshipsGoogleResponse.data : [];
    } catch (err) {
      console.error("❌ Error fetching Google Internships:", err.message);
    }

    res.json([...jobApplications, ...internshipApplications, ...jobsGoogleData, ...internshipsGoogleData]);
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});