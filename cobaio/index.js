const express = require("express");
const io = require("socketio");
const path = require("path")

let __dirname = "";

app.use(express.static(path.resolve(__dirname, "views")));

let app = express();

app.use(express.json());

let PORT = 7001;

app.get("/", (req, res) => {
  console.log(`Started server on port ${PORT}`);
});

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const ws = io(server);

ws.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on("message", (data) => {
    console.log(`New message from ${socket.id}: ${data}`);
  });

  // mengirim notifikasi
  socket.emit("notification", "Thanks for connecting to Codedamn!");
});