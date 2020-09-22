const rooms = require("../Models/Rooms");
const message = require("../Models/Message");

const getRooms = async (req, res) => {
  rooms
    .find()
    .sort({ createdOn: -1 })
    .populate("members")
    .populate({
      path: "lastMessage",
      options: { sort: { created_at: -1 } },
      perDocumentLimit: 1,
    })
    .exec((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        let y = 0;
        data.forEach(async (element) => {
          const x = await message
            .find({ room: element._id })
            .populate("createdBy")
            .sort({ createdOn: -1 })
            .limit(1)
            .exec();
          element.lastMessage = x;
          if (y === data.length - 1) res.status(200).send(data);
          y++;
        });
      }
    });
};

const getSingleRoom = (req, res) => {
  rooms
    .find({ _id: req.params.id })
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
  try {
    const data = await rooms.create(req.body);

    res.status(201).send(data);
    req.io.emit("new-room", data);
  } catch (e) {
    console.log(e);
  }
};

const joinRoom = async (req, res) => {
  console.log(req.body);
  try {
    const data = await rooms.updateOne(
      { _id: req.body.room },
      { $push: { members: req.headers.user } }
    );

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getRooms,
  createRoom,
  joinRoom,
  getSingleRoom,
};
