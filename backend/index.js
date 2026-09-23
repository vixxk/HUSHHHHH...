import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import roomRoutes from "./routes/room.routes.js";
import http from "http";
import { Server } from "socket.io";
import { prisma } from "./prisma.js";
import uploadRoutes from "./routes/upload.routes.js";
import { updateLastActivity } from "./utils/updateLastActivity.js";
import { cleanUpRooms } from "./utils/cleanUpRooms.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"]
  }
});

app.use(express.json());
app.use(cors());

app.set("io", io);

app.use("/api/room", roomRoutes);
app.use("/api", uploadRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "Server is up and running!" });
});

// Periodic inactive room cleanup
cleanUpRooms(io);
setInterval(() => cleanUpRooms(io), 5 * 60 * 1000);

// In-memory active presence: roomId -> Map(socket.id, user)
const roomUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("joinRoom", ({ roomCode, user }) => {
    if (!roomCode) return;
    const roomId = String(roomCode);
    const roomCodeNumber = parseInt(roomCode);

    socket.join(roomId);
    updateLastActivity(roomCodeNumber);

    socket.data.roomCode = roomId;
    socket.data.roomCodeNumber = roomCodeNumber;

    if (user && user.id) {
      socket.data.userId = user.id;
      socket.data.userName = user.name;

      if (!roomUsers.has(roomId)) {
        roomUsers.set(roomId, new Map());
      }
      roomUsers.get(roomId).set(socket.id, {
        id: user.id,
        name: user.name,
        isOnline: true
      });

      // Send the current list of online users in this room to the new user
      const currentUsers = Array.from(roomUsers.get(roomId).values());
      socket.emit("roomUsers", currentUsers);

      // Notify others in the room
      socket.to(roomId).emit("userJoined", {
        id: user.id,
        name: user.name,
        isOnline: true
      });
    }

    console.log(`User joined room ${roomId} (socket: ${socket.id})`);
  });

  socket.on("sendMessage", async ({ roomCode, sender, message, type = "text" }) => {
    if (!sender || !message) {
      return socket.emit("error", { message: "Sender and message are required" });
    }

    const roomCodeNum = parseInt(roomCode);
    const room = await prisma.room.findUnique({
      where: { roomCode: roomCodeNum }
    });

    if (!room) {
      return socket.emit("error", { message: "Room not found!" });
    }

    updateLastActivity(roomCodeNum);

    const messageData = {
      content: message,
      sender,
      roomCode: roomCodeNum,
      type,
      timestamp: Date.now()
    };

    io.to(String(roomCode)).emit("receiveMessage", messageData);
  });

  socket.on("typing", ({ roomCode, sender }) => {
    socket.to(String(roomCode)).emit("userTyping", { sender });
  });

  socket.on("stopTyping", ({ roomCode }) => {
    socket.to(String(roomCode)).emit("userStopTyping");
  });

  socket.on("disconnect", async () => {
    const { roomCode, roomCodeNumber, userId } = socket.data;

    if (roomCodeNumber) {
      await updateLastActivity(roomCodeNumber);
    }

    if (roomCode && roomUsers.has(roomCode)) {
      const roomMap = roomUsers.get(roomCode);
      roomMap.delete(socket.id);
      if (userId) {
        socket.to(roomCode).emit("userLeft", userId);
      }
      if (roomMap.size === 0) {
        roomUsers.delete(roomCode);
      }
    }

    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };