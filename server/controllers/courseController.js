const Course = require("../models/Course");

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { title, instructor, description, category, duration, price, enrollmentLink } = req.body;

    // Validate URL
    if (!/^https?:\/\/.+/i.test(enrollmentLink)) {
      return res.status(400).json({ error: "Invalid enrollment link. Please provide a valid URL." });
    }

    const course = new Course({
      title,
      instructor,
      description,
      category,
      duration,
      price,
      enrollmentLink,
      postedBy: req.user.id, // Assuming authentication middleware
    });

    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Failed to create course", details: error.message });
  }
};

// Get All Courses (with Pagination)
exports.getCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const courses = await Course.find().populate("postedBy", "name email").skip(skip).limit(limit);
    const total = await Course.countDocuments();

    res.json({ courses, currentPage: page, totalPages: Math.ceil(total / limit), totalItems: total });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses", details: error.message });
  }
};

// Get Single Course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("postedBy", "name email");
    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course", details: error.message });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  try {
    const { enrollmentLink } = req.body;

    // Validate Enrollment Link if provided
    if (enrollmentLink && !/^https?:\/\/.+/i.test(enrollmentLink)) {
      return res.status(400).json({ error: "Invalid enrollment link. Please provide a valid URL." });
    }

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    Object.assign(course, req.body);
    await course.save();

    res.json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Failed to update course", details: error.message });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    await course.deleteOne();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Failed to delete course", details: error.message });
  }
};
