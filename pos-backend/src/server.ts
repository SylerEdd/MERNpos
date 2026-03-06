import express from "express";
import { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db";
import { registerRoutes } from "./routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

//routes
registerRoutes(app);

//start server
app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log(`POS API running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
});
