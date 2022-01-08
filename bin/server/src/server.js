const http = require("http");
const port = process.env.PORT || 3000

const express = require("express");
const socketio = require("socket.io");

const createPlayer = require("./player");

const createBoard = require("./board");
const { getBoard, getBoardJson } = createBoard();

const chatInteractions = require("./chat");
const { sayWelcome, sayMessage } = chatInteractions();

const app = express();

app.use(express.static(`${__dirname}/../../client`));

const server = http.createServer(app);
const io = socketio(server);

getBoard();

io.on("connection", (socket) => {
  const { getColor } = createPlayer();
  const color = getColor();

  socket.emit("welcome", sayWelcome(color));
  socket.emit("renderCanvas", getBoardJson());

  socket.on("message", (msg) => io.emit("message", sayMessage(color, msg)));
  socket.on("turn", ({ x, y }) => io.emit("turn", { x, y, color }));
});

server.on("error", (err) => {
  console.error(err);
});

server.listen(port, () => {
  console.log("CuadraditosJS is started at port " + port);
});
