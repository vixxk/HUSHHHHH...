import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import roomRoutes from "../backend/routes/room.routes.js";
import http from "http";
import { Server } from "socket.io";
import { prisma } from "./prisma.js";
import uploadRoutes from "../backend/routes/upload.routes.js";
import { updateLastActivity } from "./utils/updateLastActivity.js";
import { cleanUpRooms } from "./utils/cleanUpRooms.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors:{
    origin:"*",
    methods:["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());

app.use("/api/room",roomRoutes);
app.use("/api",uploadRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (req,res) => {
  return res.status(200).json({status: "Server is up and running!"});
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

cleanUpRooms();

io.on("connection", (socket)=>{
  console.log("A user connected: ", socket.id);
  
  socket.on("joinRoom", ({roomCode}) => {
    socket.join(roomCode);
    updateLastActivity(roomCode);
    socket.data.roomCode = roomCode;
    console.log(`A user joined ${roomCode}`);
  });

  socket.on("sendMessage", async ({roomCode, sender, message, type})=>{
    
    if(!sender){
      return socket.emit("error", {message: "Sender is required"});
    };
    
    const room = await prisma.room.findUnique({
        where:{roomCode : roomCode}
    });

    if(!room){
      return socket.emit("error", {message: "Room not found!"});
    };

    updateLastActivity(roomCode);
    
    // if(!encryptionKey){
    //   return socket.emit("error", "Encryption Key is required!");
    // };

    const encryptedMessage = {
      content:message,
      sender,
      roomCode,
      type
    };

    io.to(roomCode).emit("receiveMessage", encryptedMessage);
  });


socket.on('typing', ({ roomCode, sender }) => {
  socket.to(roomCode).emit('userTyping', {sender} );
});

socket.on('stopTyping', ({ roomCode }) => {
  socket.to(roomCode).emit('userStopTyping');
});

socket.on('disconnect', () => {
  if(socket.data.roomCode){
    updateLastActivity(socket.data.roomCode);
  };

  console.log('User disconnected:', socket.id);
});

});
