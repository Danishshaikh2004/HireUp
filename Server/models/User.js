const mongoose = require("mongoose");

// Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"], // Custom error message for name
    trim: true, // Remove extra spaces
  },
  email: {
    type: String,
    required: [true, "Email is required"], // Custom error message for email
    unique: true, // Ensure email is unique
    lowercase: true, // Convert email to lowercase for consistency
    validate: {
      validator: function (value) {
        // Simple email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email format", // Custom validation message
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"], // Custom error message for password
    minlength: [6, "Password must be at least 6 characters long"], // Minimum password length
  },
  role: {
    type: String,
    enum: ["candidate", "employee"], // Restrict values to "candidate" or "employee"
    required: [true, "Role is required"], // Custom error message for role
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-set to current date/time when created
  },
});

// Export the User Model
module.exports = mongoose.model("User", userSchema);
