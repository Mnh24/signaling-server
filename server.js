const http = require("http");
const io = require("socket.io");

const server = http.createServer();
const socket = io(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

socket.on("connection", (client) => {
  console.log("Client connected:", client.id);

  client.on("join", (roomId) => {
    client.join(roomId);
  });

  client.on("signal", (data) => {
    socket.to(data.room).emit("signal", data.signal);
  });

  client.on("disconnect", () => {
    console.log("Client disconnected:", client.id);
  });
});

server.listen(3000, () => {
  console.log("✅ Signaling server running on port 3000");
});
