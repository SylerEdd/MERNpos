"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const mongoose_1 = require("mongoose");
const orderItemSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    menuItemId: { type: Number, required: true },
    orderId: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });
exports.OrderItem = (0, mongoose_1.model)("OrderItem", orderItemSchema);
