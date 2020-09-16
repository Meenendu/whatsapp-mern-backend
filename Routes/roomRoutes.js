const express = require("express");
const router = express.Router();
const { getRooms, createRoom } = require("../Controller/roomController");

router.get("/", getRooms);

router.post("/", createRoom);

module.exports = router;
