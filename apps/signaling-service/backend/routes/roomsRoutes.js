import express from "express"
import { createRoom, getRooms } from "../controllers/rooms.js";
const router = express.Router();

router.post("/createroom",createRoom);
router.get("/getrooms/:userId",getRooms)

export default router;