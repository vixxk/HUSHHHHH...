import { prisma } from "../prisma.js";

export const updateLastActivity = async (roomCode) => {
  try {
    await prisma.room.updateMany({
      where: { roomCode },
      data: { lastActivity: new Date() },
    });
  } catch (error) {
    console.log("Room Activity Updation Error:", error);
  }
};
