const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  message: { type: String },
  createdOn: { type: Date, default: Date.now },
  createdBy: { type: String },
});

module.exports = mongoose.model("Message", Message);
