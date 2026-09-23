import { prisma } from "../prisma.js";
import cloudinary from "../cloudinary.config.js";

export const cleanUpRooms = async (io) => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const inactiveRooms = await prisma.room.findMany({
      where: {
        lastActivity: {
          lt: oneHourAgo,
        },
      },
    });

    if (inactiveRooms.length > 0) {
      console.log("Cleaning up inactive rooms:", inactiveRooms.length);
    }

    for (const room of inactiveRooms) {
      const roomIdStr = String(room.roomCode);

      if (io) {
        io.to(roomIdStr).emit("roomDeleted", {
          roomCode: room.roomCode,
          message: "Room expired due to inactivity",
        });
      }

      try {
        await cloudinary.api.delete_resources_by_tag(`room_${room.roomCode}`);
      } catch (cErr) {
        // Tag might not exist or no images uploaded
      }

      await prisma.room.delete({
        where: {
          roomCode: room.roomCode,
        },
      });

      console.log(`Deleted inactive room: ${room.roomCode}`);
    }
  } catch (error) {
    console.error("Room CleanUp Error: ", error);
  }
};

export default cleanUpRooms;
