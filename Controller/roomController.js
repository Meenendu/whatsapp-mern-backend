const rooms = require("../Models/Rooms");

const getRooms = (req, res) => {
  rooms
    .find()
    .sort({ createdOn: -1 })
    .populate("members")
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
};

const createRoom = async (req, res) => {
  console.log(req.body);
  try {
    const data = await rooms.create(req.body);
    res.status(201).send(data);
    req.io.emit("new-room", data);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getRooms,
  createRoom,
};
