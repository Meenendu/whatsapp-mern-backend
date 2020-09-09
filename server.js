const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketio = require("socket.io");
const Message = require("./Models/Message");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 9000;

app.use(express.json());

const url = `mongodb+srv://admin:QI9lI7qtTSKJYbrF@cluster0.2epfm.mongodb.net/whatsappdb?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

io.on("connection", (socket) => {
  console.log("connection set");

  socket.emit("message", "Hello");
});

app.get("/", (req, res) => res.status(200).send("hello"));

app.post("/api/message", (req, res) => {
  console.log(req.body);
  try {
    Message.create(req.body, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/message", (req, res) => {
  try {
    Message.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (e) {
    console.log(e);
  }
});

server.listen(port, () => console.log("server is running"));
