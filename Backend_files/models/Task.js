const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  taskName: { type: String, required: true },
  assignedTo: { type: String, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model("Task", taskSchema);