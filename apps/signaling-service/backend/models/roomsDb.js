import mongoose from "mongoose"
import uuid from "uuid"

const Rooms = new mongoose.Schema({
    roomId : uuid(),
    userId : {
        type : String,
        unique : true,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    }
})

const Room = mongoose.model("Room",Rooms);

export default Room;