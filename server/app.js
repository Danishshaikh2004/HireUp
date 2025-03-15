require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON parsing



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


  console.log("MongoDB URI:", process.env.MONGO_URI);

const Course = require("./models/Courses");
const Internship = require("./models/Internship");
const Job = require("./models/Job");
const Application = require("./models/Application"); // or correct path

// API Route to get all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// API Route to get all internships
app.get("/api/internships", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch internships" });
  }
});

// API Route to get all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// API Route to get a specific job by ID
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Job ID" });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ error: "Failed to fetch job details" });
  }
});


// API Route to get a specific internship by ID
app.get("/api/internships/:id", async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ error: "Internship not found" });
    }
    res.json(internship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch internship details" });
  }
});

// API Route to get a specific course by ID
app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch course details" });
  }
});

// API Route to post a new job
app.post("/api/jobs", async (req, res) => {
    console.log("🔍 Received Data:", req.body); // Debugging log
  
    const { title, company, description, location, type, category, deadline, googleFormLink } = req.body;
  
    // Validate required fields
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
      res.status(201).json({ message: "Job posted successfully!", job: newJob });
    } catch (error) {
      console.error("❌ Error saving job:", error);
      res.status(500).json({ error: "Failed to post job" });
    }
  });

// API Route to update a job by ID
app.put("/api/jobs/:id", async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Job ID format" });
  }

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job updated successfully!", job: updatedJob });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
});


// API Route to delete a job
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json({ message: "Job deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

const axios = require("axios");

// Replace these with your actual Google Apps Script URLs
const GOOGLE_FORMS_JOBS_URL = "https://script.google.com/macros/s/AKfycbwuaZ5l4C_74_iIOge8QY4FObieCO_sNKv7BvQrXORJgH67ei0Xx7bcbdClBM8R7h0Z/exec";
const GOOGLE_FORMS_INTERNSHIPS_URL = "https://script.google.com/macros/s/AKfycbyuBKbTwVGuNXQCDR2QzulbYhLVMtG2YDrq9l-tyUgYjJGeChh8WA4EgsIuiSf5xiD3eg/exec";

app.get("/api/all-applications", async (req, res) => {
  try {
    console.log("🔄 Fetching applications...");

    if (!Job || !Internship) {
      console.error("❌ Job or Internship model not found.");
      return res.status(500).json({ error: "Database models not available" });
    }

    // Fetch applications from MongoDB
    const jobApplications = await Job.find();
    console.log("✅ MongoDB Job Applications:", jobApplications);

    const internshipApplications = await Internship.find();
    console.log("✅ MongoDB Internship Applications:", internshipApplications);

    // Fetch Google Forms Data
    let jobsGoogleData = [];
    let internshipsGoogleData = [];

    try {
      console.log("📡 Fetching Google Jobs Applications...");
      const jobsGoogleResponse = await axios.get(GOOGLE_FORMS_JOBS_URL);
      jobsGoogleData = Array.isArray(jobsGoogleResponse.data) ? jobsGoogleResponse.data : [];
      console.log("✅ Google Jobs Response:", jobsGoogleData);
    } catch (err) {
      console.error("❌ Error fetching Google Jobs:", err.message);
    }

    try {
      console.log("📡 Fetching Google Internships Applications...");
      const internshipsGoogleResponse = await axios.get(GOOGLE_FORMS_INTERNSHIPS_URL);
      internshipsGoogleData = Array.isArray(internshipsGoogleResponse.data) ? internshipsGoogleResponse.data : [];
      console.log("✅ Google Internships Response:", internshipsGoogleData);
    } catch (err) {
      console.error("❌ Error fetching Google Internships:", err.message);
    }

    // Ensure all applications have `_id`
    const allApplications = [
      ...jobApplications.map((app) => ({ ...app._doc, type: "Job" })),
      ...internshipApplications.map((app) => ({ ...app._doc, type: "Internship" })),

      ...jobsGoogleData.map((app) => ({
        ...app,
        _id: app._id || new mongoose.Types.ObjectId().toHexString(),
        type: "Job",
      })),

      ...internshipsGoogleData.map((app) => ({
        ...app,
        _id: app._id || new mongoose.Types.ObjectId().toHexString(),
        type: "Internship",
      })),
    ];

    res.json(allApplications);
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});






// const GOOGLE_FORMS_JOBS_URL = "https://script.google.com/macros/s/AKfycbwuaZ5l4C_74_iIOge8QY4FObieCO_sNKv7BvQrXORJgH67ei0Xx7bcbdClBM8R7h0Z/exec";
// const GOOGLE_FORMS_INTERNSHIPS_URL = "https://script.google.com/macros/s/AKfycbyuBKbTwVGuNXQCDR2QzulbYhLVMtG2YDrq9l-tyUgYjJGeChh8WA4EgsIuiSf5xiD3eg/exec";