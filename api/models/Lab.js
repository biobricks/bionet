const mongoose = require('mongoose');

const modelSchema = mongoose.Schema({
  createdAt    : { type: String, default: new Date() },
  createdBy    : { type: String, ref: "User", required: true },
  updatedAt    : { type: String, default: new Date() },
  updatedBy    : { type: String, ref: "User", required: true },
  name         : { type: String, required: true },
  description  : { type: String, default: "" },
  innerWidth   : { type: Number, default: 1, min: 1 },
  innerHeight  : { type: Number, default: 1, min: 1 },
  children     : { type: Object, default: {} },
  users        : [{ type: String, ref: "User"}],
  joinRequests : [{ type: String, ref: "User"}],
  breadcrumbs  : []
});

module.exports = mongoose.model('Lab', modelSchema);