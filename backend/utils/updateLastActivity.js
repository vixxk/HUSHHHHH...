import { prisma } from "../prisma.js";
 
export const updateLastActivity = async(req,res) =>{
    try {
        const{roomCode} = req.body;
        
        const updateLastActivity = await prisma.room.update({
            where:{roomCode:roomCode},
            data:{
                lastActivity: new Date()
            }
        });
    } catch (error) {
        console.log("Room Activity Updation Error: ", error);
        throw new Error(error);
        
    }
};