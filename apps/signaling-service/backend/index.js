import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
// import { connectRedis } from "./redisConnection";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

dotenv.config();

const port = 8080;

// connectRedis();

const rooms = {};

io.on("connection", (socket) => {
  console.log("New User connected", socket.id);

  socket.on("join-room", ({ roomid, userid, username, email }) => {
    socket.join(roomid);

    if (!rooms[roomid]) {
      rooms[roomid] = {};
    }
    rooms[roomid][socket.id] = { userid, username, email, position: null };

    const otherusers = Object.entries(rooms[roomid])
      .filter(([id]) => id != socket.id)
      .map(([id, data]) => ({ socketId: id, ...data }));

    socket.emit("existing-players", otherusers);

    socket
      .to(roomid)
      .emit("user-joined", { socketId: socket.id, userid, username });
  });

  socket.on("existing-players",(data)=>{
    console.log(data);
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(port, (req, res) => {
  console.log(`websocket server listining in port ${port}`);
});
