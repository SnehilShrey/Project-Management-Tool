const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    details: { type: String, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["On Going", "Completed"], default: "On Going" }
});

module.exports = mongoose.model("Project", projectSchema);