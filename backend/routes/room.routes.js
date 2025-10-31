import { roomCreation, generateRoomId, joinRoom, deleteRoom } from "../controllers/room.controllers.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /api/room/create:
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
 *               - isPrivate
 *             properties:
 *               admin:
 *                 type: integer
 *                 description: ID of the room creator
 *               roomId:
 *                 type: integer
 *                 description: Unique ID for the room
 *               roomName:
 *                 type: string
 *                 description: Display name of the room
 *               isPrivate:
 *                 type: boolean
 *                 description: Whether the room is private
 *               password:
 *                 type: string
 *                 description: Password if the room is private (min 4 characters)
 *     responses:
 *       200:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newRoom:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     admin:
 *                       type: integer
 *                     roomCode:
 *                       type: integer
 *                     roomName:
 *                       type: string
 *                     password:
 *                       type: string
 *                       nullable: true
 *                     isPrivate:
 *                       type: boolean
 *                     lastActivity:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/create", roomCreation);

/**
 * @swagger
 * /api/room/generateRoomId:
 *   get:
 *     summary: Generate a unique Room ID
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Successfully generated a new room ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 generatedId:
 *                   type: integer
 *                   description: Randomly generated unique room ID
 */
router.get("/generateRoomId", generateRoomId);

/**
 * @swagger
 * /api/room/join:
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
 *               - isPrivate
 *             properties:
 *               roomId:
 *                 type: integer
 *                 description: The ID of the room to join
 *               isPrivate:
 *                 type: boolean
 *                 description: Whether the room is private
 *               password:
 *                 type: string
 *                 description: Password for private rooms (required if isPrivate is true)
 *     responses:
 *       200:
 *         description: Successfully joined the room
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     admin:
 *                       type: integer
 *                     roomCode:
 *                       type: integer
 *                     roomName:
 *                       type: string
 *                     password:
 *                       type: string
 *                       nullable: true
 *                     isPrivate:
 *                       type: boolean
 *                     lastActivity:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid credentials or password error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/join", joinRoom);

/**
 * @swagger
 * /api/room/delete:
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
 *                 type: integer
 *                 description: The room code of the room to delete
 *               userId:
 *                 type: integer
 *                 description: The ID of the admin requesting deletion
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Only admin can delete room
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete("/delete", deleteRoom);

export default router;
