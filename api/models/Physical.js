const mongoose = require("mongoose");

const modelSchema = mongoose.Schema({
  createdAt    : { type: String, default: new Date() },
  createdBy    : { type: String, ref: "User", required: true },
  updatedAt    : { type: String, default: new Date() },
  updatedBy    : { type: String, ref: "User", required: true },
  name         : { type: String, required: true },
  description  : { type: String, default: "" },
  lab          : { type: String, ref: "Lab", required: true }, 
  parent       : { type: String, ref: "Container" },
  parentX      : { type: Number, default: 1 },
  parentY      : { type: Number, default: 1 },
  virtual      : { type: String, ref: "Virtual", required: true },
  width        : { type: Number, default: 1 },
  height       : { type: Number, default: 1 }
});

module.exports = mongoose.model("Physical", modelSchema);