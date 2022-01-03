const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

const server = require("../src/server.js");

describe("Server", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should forward message on message", (done) => {
    clientSocket.on("message", (arg) => {
      done();
    });
    serverSocket.emit("message", expect.anything());
  });
});
