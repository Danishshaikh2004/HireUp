const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  status: { type: String, enum: ["Pending", "Reviewed", "Accepted", "Rejected"], default: "Pending" },
  appliedAt: { type: Date, default: Date.now }
});  
module.exports = mongoose.model("Application", applicationSchema);