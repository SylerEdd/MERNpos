"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
const mongoose_1 = require("mongoose");
const menuItemSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    sectionId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });
exports.MenuItem = (0, mongoose_1.model)("MenuItem", menuItemSchema);
