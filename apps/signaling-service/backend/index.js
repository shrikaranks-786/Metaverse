import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDb } from "./models/connectDb.js";
import roomRoutes from "./routes/roomsRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(roomRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

dotenv.config();

connectDb();

const port = process.env.PORT || 8080;

const rooms = {};

io.on("connection", (socket) => {
  console.log("New User connected", socket.id);

  socket.on("join-room", ({ roomid, userid, username, email }) => {
    socket.join(roomid);

    if (!rooms[roomid]) {
      rooms[roomid] = {};
    }
    rooms[roomid][socket.id] = {
      userid,
      username,
      email,
      position: { x: 0, y: 0, z: 0 },
    };

    const otherusers = Object.entries(rooms[roomid])
      .filter(([id]) => id != socket.id)
      .map(([id, data]) => ({ socketId: id, ...data }));

    socket.emit("existing-players", otherusers);

    socket.to(roomid).emit("user-joined", {
      socketId: socket.id,
      userid,
      username,
      email,
      position: { x: 0, y: 0, z: 0 },
    });
  });
});

server.listen(port, (req, res) => {
  console.log(`websocket server listining in port ${port}`);
});
