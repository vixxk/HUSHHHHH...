import { prisma } from "../prisma.js";

export const cleanUpRooms = async () => {
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
      await prisma.room.delete({
        where: {
          roomCode: room.roomCode, 
        },
      });

      console.log(`Deleted room: ${room.roomCode}`);
    }

  } catch (error) {
    console.log("Room CleanUp Error: ", error);
    throw error;
  }
};

setInterval(cleanUpRooms, 5 * 60 * 1000);

export default cleanUpRooms;
