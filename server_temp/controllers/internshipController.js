const Internship = require("../models/Internship");

// Create Internship
const createInternship = async (req, res) => {
  try {
    const { title, company, location, stipend, duration, skills, postedBy, googleFormLink } = req.body;

    // Validate Google Form Link
    if (!googleFormLink || !/^https:\/\/docs\.google\.com\/forms\/d\/.+/i.test(googleFormLink)) {
      return res.status(400).json({ message: "Invalid Google Form link. Please provide a valid URL." });
    }

    const newInternship = new Internship({
      title,
      company,
      location,
      stipend,
      duration,
      skills,
      postedBy,
      googleFormLink,
    });

    const savedInternship = await newInternship.save();
    res.status(201).json(savedInternship);
  } catch (error) {
    console.error("Error creating internship:", error);
    res.status(500).json({ message: "Error creating internship", error: error.message });
  }
};

// Get All Internships with Pagination
const getInternships = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const internships = await Internship.find().skip(skip).limit(limit);
    const total = await Internship.countDocuments();

    res.json({
      internships,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    console.error("Error fetching internships:", error);
    res.status(500).json({ message: "Error fetching internships", error: error.message });
  }
};

// Get Single Internship by ID
const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    res.json(internship);
  } catch (error) {
    console.error("Error fetching internship details:", error);
    res.status(500).json({ message: "Error fetching internship details", error: error.message });
  }
};

// Update Internship
const updateInternship = async (req, res) => {
  try {
    const { googleFormLink } = req.body;

    // Validate Google Form Link if provided
    if (googleFormLink && !/^https:\/\/docs\.google\.com\/forms\/d\/.+/i.test(googleFormLink)) {
      return res.status(400).json({ message: "Invalid Google Form link. Please provide a valid URL." });
    }

    const updatedInternship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInternship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    res.json(updatedInternship);
  } catch (error) {
    console.error("Error updating internship:", error);
    res.status(500).json({ message: "Error updating internship", error: error.message });
  }
};

// Delete Internship
const deleteInternship = async (req, res) => {
  try {
    const deletedInternship = await Internship.findByIdAndDelete(req.params.id);
    if (!deletedInternship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    res.json({ message: "Internship deleted successfully" });
  } catch (error) {
    console.error("Error deleting internship:", error);
    res.status(500).json({ message: "Error deleting internship", error: error.message });
  }
};

module.exports = {
  createInternship,
  getInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
};
