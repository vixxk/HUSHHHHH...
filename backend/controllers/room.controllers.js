


const roomCreation = (req,res)=>{
    try {
        const {isPrivate,roomId,roomName} = req.body;
        
        if(!roomId || !roomName){
            return res.status(400).json("Room ID and Room Name are required!");
        }

        const isIdNotAvailable = await 

    } catch (error) {
        console.log("Room Creation Error!");
        throw new Error(error);
    }
}