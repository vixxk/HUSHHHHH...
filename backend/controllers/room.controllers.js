import { prisma } from "../prisma.js";
import { roomIdGenerator } from "../utils/roomIdGenerator.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { updateLastActivity } from "../utils/updateLastActivity.js";
import cloudinary from "../cloudinary.config.js";

export const roomCreation = async (req, res) => {
  try {
    const { isPrivate, roomId, roomName, password = "" } = req.body;

    if (!roomId || !roomName) {
      return res.status(400).json({ message: "Room ID and Room Name are required!" });
    }

    if (isPrivate && !password) {
      return res.status(400).json({ message: "Private rooms require password!" });
    }

    if (isPrivate && password.length < 4) {
      return res.status(400).json({ message: "Password must be at least 4 characters long!" });
    }

    const roomCodeInt = parseInt(roomId);
    const existingRoom = await prisma.room.findUnique({
      where: { roomCode: roomCodeInt }
    });

    if (existingRoom) {
      return res.status(400).json({ message: "Room with this ID already exists" });
    }

    let hashedPassword = null;
    if (isPrivate) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Cryptographically secure admin token
    const adminToken = crypto.randomBytes(32).toString("hex");
    const adminTokenHash = crypto.createHash("sha256").update(adminToken).digest("hex");

    const newRoom = await prisma.room.create({
      data: {
        roomCode: roomCodeInt,
        roomName: roomName.trim(),
        password: hashedPassword,
        isPrivate: Boolean(isPrivate),
        adminTokenHash,
        lastActivity: new Date()
      }
    });

    // Strip hash before returning
    const safeRoom = {
      id: newRoom.id,
      roomCode: newRoom.roomCode,
      roomName: newRoom.roomName,
      isPrivate: newRoom.isPrivate,
      createdAt: newRoom.createdAt
    };

    return res.status(200).json({ newRoom: safeRoom, adminToken });
  } catch (error) {
    console.error("Room Creation Error:", error);
    return res.status(500).json({ message: "Room Creation Error", error: error.message });
  }
};

export const generateRoomId = async (req, res) => {
  try {
    let generatedId;
    let attempts = 0;

    while (attempts < 15) {
      generatedId = roomIdGenerator();
      const existingRoom = await prisma.room.findUnique({
        where: { roomCode: generatedId }
      });
      if (!existingRoom) break;
      attempts++;
    }

    return res.status(200).json({ generatedId });
  } catch (error) {
    console.error("ID Generation Error:", error);
    return res.status(500).json({ message: "ID Generation Error", error: error.message });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { roomId, password, isPrivate } = req.body;

    if (!roomId) {
      return res.status(400).json({ message: "Room Id is required!" });
    }

    if (isPrivate && !password) {
      return res.status(400).json({ message: "Password is required for private rooms!" });
    }

    const roomCodeInt = parseInt(roomId);
    const room = await prisma.room.findUnique({
      where: { roomCode: roomCodeInt }
    });

    if (!room) {
      return res.status(404).json({ message: "Invalid Credentials! Room does not exist" });
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

    const safeRoom = {
      id: room.id,
      roomCode: room.roomCode,
      roomName: room.roomName,
      isPrivate: room.isPrivate,
      createdAt: room.createdAt
    };

    return res.status(200).json({ room: safeRoom });
  } catch (error) {
    console.error("Room Join Error:", error);
    return res.status(500).json({ message: "Room Join Error", error: error.message });
  }
};

export const verifyAdmin = async (req, res) => {
  try {
    const roomCode = req.body.roomCode || req.query.roomCode;
    const adminToken = req.headers["x-admin-token"] || req.body.adminToken;

    if (!roomCode || !adminToken) {
      return res.status(200).json({ isAdmin: false });
    }

    const room = await prisma.room.findUnique({
      where: { roomCode: parseInt(roomCode) }
    });

    if (!room) {
      return res.status(404).json({ isAdmin: false, message: "Room not found" });
    }

    const tokenHash = crypto.createHash("sha256").update(adminToken).digest("hex");
    const isAdmin = tokenHash === room.adminTokenHash;

    return res.status(200).json({ isAdmin });
  } catch (error) {
    console.error("Admin Verification Error:", error);
    return res.status(500).json({ isAdmin: false, message: "Verification failed" });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const roomCode = req.body.roomCode;
    const adminToken = req.headers["x-admin-token"] || req.body.adminToken;

    if (!roomCode) {
      return res.status(400).json({ message: "Room code is required" });
    }

    if (!adminToken) {
      return res.status(401).json({ message: "Admin token required to delete room" });
    }

    const roomCodeInt = parseInt(roomCode);
    const room = await prisma.room.findUnique({
      where: { roomCode: roomCodeInt }
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found!" });
    }

    const tokenHash = crypto.createHash("sha256").update(adminToken).digest("hex");
    if (tokenHash !== room.adminTokenHash) {
      return res.status(403).json({ message: "Forbidden: Invalid admin token!" });
    }

    const io = req.app.get("io");
    const roomIdStr = String(roomCodeInt);

    if (io) {
      io.to(roomIdStr).emit("roomDeleted", {
        roomCode: roomCodeInt,
        message: "This room has been deleted by the admin"
      });
    }

    // Best-effort cleanup of Cloudinary uploads tagged with this room
    try {
      await cloudinary.api.delete_resources_by_tag(`room_${roomCodeInt}`);
    } catch (cErr) {
      // Non-fatal if no resources tagged
    }

    // Small delay to ensure the event is transmitted before closing room
    await new Promise((resolve) => setTimeout(resolve, 300));

    await prisma.room.delete({
      where: { roomCode: roomCodeInt }
    });

    return res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("❌ Room deletion Error:", error);
    return res.status(500).json({ message: "Failed to delete room", error: error.message });
  }
};