import mongoose, { Document, Schema } from "mongoose";
import { OrderStatus } from "../enums/OrderStatus";

export interface IOrder extends Document {
  id: number;
  tableId: number;
  userId: number;
  totalAmount: number;
  status: OrderStatus;
  openedAt: any;
  closedAt: any | null;
  createdAt: any;
}

const orderSchema = new Schema<IOrder>(
  {
    id: { type: Number, required: true, unique: true },
    tableId: { type: Number, required: true },
    userId: { type: Number, required: true },
    totalAmount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.OPEN,
    },
    openedAt: { type: Date, default: Date.now },
    closedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
