const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"], trim: true },
  company: { type: String, required: [true, "Company name is required"], trim: true },
  description: { type: String, required: [true, "Description is required"], trim: true },
  duration: { type: String, required: [true, "Duration is required"], trim: true },
  location: { type: String, required: [true, "Location is required"], trim: true },
  stipend: { type: String, default: "Unpaid", trim: true },
  postedAt: { type: Date, default: Date.now },
  googleFormLink: { type: String, required: true }, // Added Google Form link field
});

module.exports = mongoose.model("Internship", internshipSchema);
