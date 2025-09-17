import { prisma } from "../prisma.js";

export const cleanUpRooms = async(req,res)=>{
    try {
        const oneHourAgo = new Date(Date.now() - 60*60*1000);

        const inactiveRooms = await prisma.room.findMany({
            where:{
                lastActivity:{
                    lt: oneHourAgo
                }
            }
        });

        if(inactiveRooms.length > 0){
            console.log("Cleaning Up inactivity rooms!");
        }

        for (const inactiveRoom in inactiveRooms){
            const cleanUp = await prisma.room.delete({
                where:{
                    roomCode: roomCode
                }
            });
        }
        

    } catch (error) {
        console.log("Room CleanUp Error: ", error);
        throw new Error(error);
        
    }
}

    setInterval(cleanUpRooms, 5 * 60 * 1000);

    export default cleanUpRooms;