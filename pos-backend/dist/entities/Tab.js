"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tab = void 0;
const mongoose_1 = require("mongoose");
const TableStatus_1 = require("../enums/TableStatus");
const tabSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    tableNumber: { type: String, required: true },
    tableStatus: {
        type: String,
        enum: Object.values(TableStatus_1.TableStatus),
        default: TableStatus_1.TableStatus.OPEN,
    },
}, { timestamps: true });
exports.Tab = (0, mongoose_1.model)("Tab", tabSchema);
