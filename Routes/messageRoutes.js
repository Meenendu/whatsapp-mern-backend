const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  postMessage,
} = require("../Controller/messageController");

router.get("/", getAllMessages);

router.post("/", postMessage);

module.exports = router;
