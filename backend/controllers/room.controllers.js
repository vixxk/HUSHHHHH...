import {prisma} from "../prisma.js";
import { roomIdGenerator } from "../utils/roomIdGenerator.js";
import bcrypt from "bcryptjs";
import { updateLastActivity } from "../utils/updateLastActivity.js";

export const roomCreation = async (req,res)=>{
    try {
        const {admin,isPrivate,roomId,roomName,password=""} = req.body;
        
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

        let hashedPassword;
        if(isPrivate){
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password,salt);
        };

        const newRoom = await prisma.room.create({
            data:{
                admin,
                roomCode: roomId,
                roomName,
                password: isPrivate ? hashedPassword : null,
                isPrivate,
                lastActivity: new Date()
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
            where: {roomCode : generatedId}
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
            where: {roomCode:roomId}
        });

        if(!room){
            res.status(404).json({message: "Invalid Credentials! Room does not exist"});
        }
        
        updateLastActivity(room.roomCode);
        
        if (room.isPrivate) {
            if (!password) {
              return res.status(400).json({ message: "Password is required for this private room!" });
            }
      
            const isMatch = await bcrypt.compare(password, room.password);
            if (!isMatch) {
              return res.status(400).json({ message: "Wrong password!" });
            }
        }

        return res.status(200).json({room});

    } catch (error) {
        console.log("Room Join Error!");
        throw new Error(error);
    }
};

export const deleteRoom = async (req,res) =>{
    try {
        const {roomCode,userId} = req.body;
    
        const room = await prisma.room.findUnique({
            where: {roomCode:roomCode}
        });

        if(room.admin != userId){
            return res.status(400).json({message: "Only the admin can delete room!"})
        };

        const deleteRoom = await prisma.room.delete({
            where: {roomCode:roomCode}
        });

        return res.status(200).json({message: "Room deleted successfully"});
        
    } catch (error) {
        console.log("Room deletion Error:",error);
        throw new Error(error);
    }
};