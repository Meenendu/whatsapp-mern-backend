const mongoose = require("mongoose");

const message = new mongoose.Schema({
  message: { type: String },
  createdOn: { type: Date, default: Date.now },
  createdBy: { type: String, ref: "user" },
  room: { type: String, ref: "room" },
});

module.exports = mongoose.model("message", message);
