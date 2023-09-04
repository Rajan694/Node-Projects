const path = require("path");
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const port = 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server);
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
  console.log("New user connected");

  // joins the user
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) return callback(error);

    socket.join(user.room);

    //message to all users
    socket.emit("message", generateMessage("Admin", "Welcome!"));

    //message when user connects
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage("Admin", `${user.username} has joined`));
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });
  //taking message from users and emitting it
  socket.on("sendMessage", (data, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", generateMessage(user.username, data));
    callback("delivered");
  });

  //taking location from user and emitting it
  socket.on("sendLocation", (data, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://google.com/maps?q=${data.latitude},${data.longitude}`
      )
    );
    callback("location shared");
  });

  //message when user disconnect
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username} has left.`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
