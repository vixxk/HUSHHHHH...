import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import roomRoutes from "../backend/routes/room.routes.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());

app.use("/api/room",roomRoutes);

app.get("/health", (req,res) => {
  return res.status(200).json("Server is up and running!");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


io.on("connection", (socket)=>{
  console.log("A user connected");
  socket.on("disconnect", ()=>{
    console.log("A user disconnected");app
  });
});
