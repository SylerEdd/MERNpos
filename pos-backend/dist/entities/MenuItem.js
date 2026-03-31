"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
const mongoose_1 = require("mongoose");
const SectionType_1 = require("../enums/SectionType");
const menuItemSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    section: {
        type: String,
        enum: Object.values(SectionType_1.SectionType),
        required: true,
    },
}, { timestamps: true });
exports.MenuItem = (0, mongoose_1.model)("IMenuItem", menuItemSchema);
