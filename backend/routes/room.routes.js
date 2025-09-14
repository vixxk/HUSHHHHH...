import {roomCreation,generateRoomId,joinRoom} from "../controllers/room.controllers.js";
import express from "express";

const router = express.Router();

router.get("/create",roomCreation);
router.get("/generateRoomId",generateRoomId);
router.get("/join",joinRoom);

export default router;