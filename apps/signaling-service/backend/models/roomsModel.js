import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Rooms = new mongoose.Schema({
  roomId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  userId: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
});

const Room = mongoose.model("Room", Rooms);
export default Room;
