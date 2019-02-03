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
  parentZ      : { type: Number, default: 1 },
  innerWidth   : { type: Number, default: 1, min: 1 },
  innerHeight  : { type: Number, default: 1, min: 1 },
  width        : { type: Number, default: 1 },
  height       : { type: Number, default: 1 },
  children     : Object,
  category     : { type: String, default: "" },
  bgColor      : { type: String, default: "#00D1FD" },
  breadcrumbs  : [],
  model        : { type: String, default: "Container" },
  endpoint     : { type: String, default: "containers" },
  icon         : { type: String, default: "grid" }
});

module.exports = mongoose.model("Container", modelSchema);