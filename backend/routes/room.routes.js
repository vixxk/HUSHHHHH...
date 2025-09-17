import {roomCreation,generateRoomId,joinRoom,deleteRoom} from "../controllers/room.controllers.js";
import express from "express";

const router = express.Router();

router.get("/create",roomCreation);
router.get("/generateRoomId",generateRoomId);
router.get("/join",joinRoom);
router.delete("/delete",deleteRoom);

export default router;