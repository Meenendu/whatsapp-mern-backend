const mongoose = require("mongoose");

const rooms = new mongoose.Schema({
  room: { type: String },
  createdOn: { type: Date, default: Date.now },
  createdBy: { type: String },
  members: [{ type: String, ref: "user" }],
  lastMessage: { type: Object },
});

module.exports = mongoose.model("rooms", rooms);
