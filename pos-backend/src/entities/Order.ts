import mongoose, { Document, Schema } from "mongoose";
import { OrderStatus } from "../enums/OrderStatus";
import { OrderItemResponse } from "../dto/orderItem/OrderItemResponse";

export interface IOrder extends Document {
  id: number;
  tabId: number;
  userId: number;
  totalAmount: number;
  status: OrderStatus;
  orderItems: OrderItemResponse[];
  openedAt: any;
  closedAt: any | null;
  createdAt: any;
}

const orderSchema = new Schema<IOrder>(
  {
    id: { type: Number, required: true, unique: true },
    tabId: { type: Number, required: true },
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
