import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Application } from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { connectToDatabase } from "./config/db";
import { registerRoutes } from "./routes";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "pos-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 60 * 60 * 24, // 1 day
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);

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
