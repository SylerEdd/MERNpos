"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//routes
(0, routes_1.registerRoutes)(app);
//start server
app.listen(PORT, async () => {
    try {
        await (0, db_1.connectToDatabase)();
        console.log(`POS API running on http://localhost:${PORT}`);
    }
    catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
});
