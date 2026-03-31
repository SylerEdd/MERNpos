"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    orderId: { type: Number, required: true },
    amount: { type: Number, required: true },
    paidAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.Payment = (0, mongoose_1.model)("Payment", paymentSchema);
