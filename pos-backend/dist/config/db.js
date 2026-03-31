"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pos_db";
// Function to connect to MongoDB
async function connectToDatabase() {
    await mongoose_1.default.connect(MONGO_URI);
    console.log("Connected to MongoDB");
}
