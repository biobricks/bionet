const mongoose = require("mongoose");

const modelSchema = mongoose.Schema({
  createdAt    : { type: String, default: new Date() },
  createdBy    : { type: String, ref: "User", required: true },
  updatedAt    : { type: String, default: new Date() },
  updatedBy    : { type: String, ref: "User", required: true },
  name         : { type: String, unique: true, required: true },
  description  : { type: String, default: "" },
  isAvailable  : { type: Boolean, default: false },
  provenance   : { type: String, default: "" },
  genotype     : { type: String, default: "" },
  sequence     : { type: String, default: "" },
  fgSubmitted  : { type: Boolean, default: false },
  fgStage      : { type: Number, default: 0 },
  category     : { type: String, default: ""},
  breadcrumbs  : [],
  model        : { type: String, default: "Virtual" },
  endpoint     : { type: String, default: "virtuals" },
  icon         : { type: String, default: "dna" }
});

module.exports = mongoose.model("Virtual", modelSchema);