const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String },
    createdOn: { type: Date, default: Date.now },
    imageUrl: { type: String },
    email: { type: String },
    socketId: { type: String },
  },
  { _id: false }
);

module.exports = mongoose.model("user", user);
