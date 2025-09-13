import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import roomRoutes from "routes/room.routes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/room",roomRoutes);

app.get("/health", (req,res) => {
  return res.status(200).json("Server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
