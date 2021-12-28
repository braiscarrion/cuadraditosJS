const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const createPlayer = require("./player");
const { getName } = createPlayer();

const app = express();

app.use(express.static(`${__dirname}/../../client`));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.emit("welcome", getName());

  socket.on("message", (msg) => io.emit("message", getName(), msg));
});

server.on("error", (err) => {
  console.error(err);
});

server.listen(8080, () => {
  console.log("CuadraditosJS is started");
});
