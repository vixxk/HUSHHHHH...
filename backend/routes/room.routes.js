import roomCreation from "../controllers/room.controllers.js";
import generateRoomId from "../controllers/room.controllers.js";
import joinRoom from "../controllers/room.controllers.js";


app.get("/create",roomCreation);
app.get("/generateRoomId",generateRoomId);
app.get("/join",joinRoom);
