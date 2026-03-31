"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    roles: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Role" }],
    // roles: [{ type: Number, ref: "Role" }],
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
