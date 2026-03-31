import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pos_db";
const MONGO_URI =
  "mongodb+srv://admin:admin123@mernpos.yaqntdc.mongodb.net/?appName=MERNpos";

// Function to connect to MongoDB
export async function connectToDatabase(): Promise<void> {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");
}
