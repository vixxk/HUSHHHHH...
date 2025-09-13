import {prisma} from "../prisma.js";
import { roomIdGenerator } from "../utils/roomIdGenerator.js";

export const roomCreation = async (req,res)=>{
    try {
        const {isPrivate,roomId,roomName,password=""} = req.body;
        
        if(!roomId || !roomName){
            return res.status(400).json({message: "Room ID and Room Name are required!"});
        }

        if(isPrivate && !password){
            return res.status(400).json({message: "Private rooms require password!"});
        }
        
        if(isPrivate && password.length<4){
            return res.status(400).json({message: "Password must be at least 4 characters long!"});
        }

        const existingRoom = await prisma.room.findUnique({
            where:{roomCode:roomId}
        });

        if(existingRoom){
            return res.status(400).json({message: "Room with this ID already exists"});
        }

        const newRoom = await prisma.room.create({
            data:{
                roomCode: roomId,
                roomName,
                password: isPrivate ? password : null,
                isPrivate
            }
        });

        res.status(200).json({newRoom});

    } catch (error) {
        console.log("Room Creation Error!");
        throw new Error(error);
    }
}

export const generateRoomId = async (req,res) =>{
    try {
        let generatedId = roomIdGenerator();

        const existingRoom = await prisma.room.findUnique({
            where: {roomId : generatedId}
        });
        
        if(existingRoom){
            generatedId = roomIdGenerator();
        }

        return res.status(200).json({generatedId});
    } catch (error) {
        console.log("ID Generation Error!");
        throw new Error(error);
    }
};


export const joinRoom = async (req,res) =>{
    try {
        const {roomId,password,isPrivate} = req.body;

        if(!roomId){
            return res.status(400).json({message: "Room Id is required!"});
        }

        if(isPrivate && !password){
            return res.status(400).json({message: "Password is required for private rooms!"})
        }

        const room = await prisma.room.findUnique({
            where: {roomId:roomId}
        });

        if(!room){
            res.status(404).json({message: "Invalid Credentials! Room does not exist"});
        }

        const roomPassword = room.password;
        if(password != roomPassword){
            return res.status(400).json({message: "Wrong password!"});
        };

        return res.status(200).json({room});

    } catch (error) {
        console.log("Room Joim Error!");
        throw new Error(error);
    }
};