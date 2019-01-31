const mongoose = require("mongoose");

const modelSchema = mongoose.Schema({
  createdAt    : { type: String, default: new Date() },
  createdBy    : { type: String, ref: "User", required: true },
  updatedAt    : { type: String, default: new Date() },
  updatedBy    : { type: String, ref: "User", required: true },
  name         : { type: String, unique: true, required: true },
  description  : { type: String, default: "" },
  isAvailable  : { type: Boolean, default: false },
  provenance   : { type: String },
  genotype     : { type: String },
  sequence     : { type: String },
  fgSubmitted  : { type: Boolean, default: false },
  fgStage      : { type: Number, default: 0 },
  category     : { type: String, required: true }
});

module.exports = mongoose.model("Virtual", modelSchema);