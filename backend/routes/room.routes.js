import { roomCreation, generateRoomId, joinRoom, deleteRoom } from "../controllers/room.controllers.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /rooms/create:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - admin
 *               - roomId
 *               - roomName
 *             properties:
 *               admin:
 *                 type: string
 *                 description: ID of the room creator
 *               roomId:
 *                 type: string
 *                 description: Unique ID for the room
 *               roomName:
 *                 type: string
 *                 description: Display name of the room
 *               isPrivate:
 *                 type: boolean
 *                 description: Whether the room is private
 *               password:
 *                 type: string
 *                 description: Password if the room is private
 *     responses:
 *       200:
 *         description: Room created successfully
 *       400:
 *         description: Validation error
 */
router.post("/create", roomCreation);

/**
 * @swagger
 * /rooms/generateRoomId:
 *   get:
 *     summary: Generate a unique Room ID
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Successfully generated a new room ID
 */
router.get("/generateRoomId", generateRoomId);

/**
 * @swagger
 * /rooms/join:
 *   post:
 *     summary: Join an existing room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: The ID of the room to join
 *               isPrivate:
 *                 type: boolean
 *                 description: Whether the room is private
 *               password:
 *                 type: string
 *                 description: Password for private rooms
 *     responses:
 *       200:
 *         description: Successfully joined the room
 *       400:
 *         description: Invalid credentials or password error
 *       404:
 *         description: Room not found
 */
router.post("/join", joinRoom);

/**
 * @swagger
 * /rooms/delete:
 *   delete:
 *     summary: Delete an existing room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomCode
 *               - userId
 *             properties:
 *               roomCode:
 *                 type: string
 *                 description: The ID of the room to delete
 *               userId:
 *                 type: string
 *                 description: The ID of the admin requesting deletion
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       400:
 *         description: Only admin can delete room
 */
router.delete("/delete", deleteRoom);

export default router;
