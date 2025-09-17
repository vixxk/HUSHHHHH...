import { prisma } from "../prisma.js";
 
export const updateLastActivity = async(req,res) =>{
    try {
        const{roomCode} = req.body;
        
        const updateLastActivity = await prisma.room.findUnique({
            where:{roomCode:roomCode},
            data:{
                lastActivity: Date.now()
            }
        });
    } catch (error) {
        console.log("Room Activity Updation Error: ", error);
        throw new Error(error);
        
    }
};