import { roomCreation, generateRoomId, joinRoom, deleteRoom, verifyAdmin } from "../controllers/room.controllers.js";
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
 *               - roomId
 *               - roomName
 *               - isPrivate
 *             properties:
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
 *                 adminToken:
 *                   type: string
 *       400:
 *         description: Validation error
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
 *             properties:
 *               roomId:
 *                 type: integer
 *               isPrivate:
 *                 type: boolean
 *               password:
 *                 type: string
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
 * /api/room/verify-admin:
 *   post:
 *     summary: Verify if the client possesses the admin token for the room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomCode
 *               - adminToken
 *             properties:
 *               roomCode:
 *                 type: integer
 *               adminToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAdmin:
 *                   type: boolean
 */
router.post("/verify-admin", verifyAdmin);

/**
 * @swagger
 * /api/room/delete:
 *   delete:
 *     summary: Delete an existing room
 *     tags: [Rooms]
 *     parameters:
 *       - in: header
 *         name: x-admin-token
 *         schema:
 *           type: string
 *         description: Secret admin token obtained when creating the room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomCode
 *             properties:
 *               roomCode:
 *                 type: integer
 *               adminToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       403:
 *         description: Invalid admin token
 *       404:
 *         description: Room not found
 */
router.delete("/delete", deleteRoom);

export default router;
