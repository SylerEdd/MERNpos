import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem extends Document {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: any;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    id: { type: Number, required: true, unique: true },
    orderId: { type: Number, required: true },
    menuItemId: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

export const OrderItem = mongoose.model<IOrderItem>(
  "OrderItem",
  OrderItemSchema,
);
