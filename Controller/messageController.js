const message = require("../Models/Message");

const postMessage = async (req, res) => {
  console.log(req.body);
  try {
    const data = await message.create(req.body);
    res.status(201).send(data);
    message
      .find({ _id: data._id })
      .populate("createdBy")
      .exec((err, data2) => {
        if (err) {
          res.status(500).send(err);
        } else {
          req.io.emit("new-message", data2);
        }
      });
  } catch (e) {
    console.log(e);
  }
};

const getAllMessages = (req, res) => {
  message
    .find()
    .populate("createdBy")
    .exec((err, data) => {
      // console.log(data);
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
};

module.exports = {
  getAllMessages,
  postMessage,
};
