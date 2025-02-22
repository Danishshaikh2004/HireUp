const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Course title is required"], trim: true },
  provider: { type: String, required: [true, "Course provider is required"], trim: true },
  description: { type: String, required: [true, "Course description is required"], trim: true },
  duration: { type: String, required: [true, "Course duration is required"], trim: true },
  price: { type: Number, required: [true, "Course price is required"], min: [0, "Price must be positive"] },
  postedAt: { type: Date, default: Date.now },
  googleFormLink: { type: String, required: true }, // Added Google Form link field
});

module.exports = mongoose.model("Course", courseSchema);
