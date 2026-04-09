import { Schema, model, Document } from "mongoose";
import { PaymentMethod } from "../enums/PaymentMethod";

export interface IPayment extends Document {
  id: number;
  orderId: number;
  amount: number;
  paymentMethod: PaymentMethod;
  processedByUserId: number;
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    id: { type: Number, required: true, unique: true },
    orderId: { type: Number, required: true },
    amount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
    },
    processedByUserId: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Payment = model<IPayment>("Payment", paymentSchema);
