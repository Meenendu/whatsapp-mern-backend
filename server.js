const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./src/Models/User");
const roomRoutes = require("./src/Routes/roomRoutes");
const userRoutes = require("./src/Routes/userRoutes");
const messageRoutes = require("./src/Routes/messageRoutes");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
  req.io = io;
  next();
});

const url = `mongodb+srv://admin:QI9lI7qtTSKJYbrF@cluster0.2epfm.mongodb.net/whatsappdb?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

io.on("connection", (socket) => {
  console.log("connection set" + socket.id);
  socket.on("user-joined", (data) => addUser(data, socket.id));
  socket.on("join-room", (room) => {
    console.log("kkkkkkk", room);
    socket.join(room);
    socket.to(room).emit("new-user-joined", `New User Has Joined the room`);
  });
});

const addUser = async (x, id) => {
  const isUserExist = await user.findOne({ _id: x._id });
  if (isUserExist) {
    await user.updateOne({ _id: x._id }, { socketId: id });
    return;
  }

  try {
    await user.create({ ...x, socketId: id });
  } catch (e) {
    console.log(e);
  }
};

app.use((req, res, next) => {
  console.log(req.params.id);
  if (req.body) req.body.createdBy = req.headers.user;
  next();
});

//Routes
app.use("/api/room", roomRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

server.listen(port, () => console.log("server is running"));
