"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    tableId: { type: Number, required: true },
    userId: { type: Number, required: true },
    orderItems: { type: [Number], default: [] },
    totalAmount: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["OPEN", "CLOSED", "CANCELED"],
        default: "OPEN",
    },
    openedAt: { type: Date, default: Date.now },
    closedAt: { type: Date, default: null },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
