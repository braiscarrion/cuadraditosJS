const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.emit("message", "Wellcome to CuadraditosJS");

  socket.on("message", (msg) => io.emit("message", msg));
});

server.on("error", (err) => {
  console.error(err);
});

server.listen(8080, () => {
  console.log("CuadraditosJS is started");
});
