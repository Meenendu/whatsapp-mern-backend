const express = require("express");
const router = express.Router();
const {
  getRooms,
  createRoom,
  joinRoom,
  getSingleRoom,
} = require("../Controller/roomController");

router.get("/", getRooms);

router.get("/:id", getSingleRoom);

router.post("/", createRoom);

router.post("/join", joinRoom);

module.exports = router;
