import mongoose from "mongoose"
import Room from "../models/roomsDb";

export const createRoom = async (req,res)=>{
    try{
        const {username,userId,email} = req.body;

        const newRoom = new Room({username,userId,email});

        await newRoom.save();

        res.status(200).json({message : "Romm created Success fully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Error creating room", error: error.message });
    }
}

export const getRooms = async (req,res)=>{
    try{
        const {userId} = req.params;

        const isUserThere = Room.findOne({userId});

        if(!isUserThere){
            res.status(400).json({message : "User Not Found"});
        }

        const rooms = await Room.find({ userId });

        res.status(200).json({rooms : rooms,message : "Success"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Error fetching rooms", error: error.message });
    }
}