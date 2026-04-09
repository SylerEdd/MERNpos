import { PaymentMethod } from "../../enums/PaymentMethod";

export interface PaymentResponse {
  id: number;
  orderId: number;
  amount: number;
  paymentMethod: PaymentMethod;
  processedByUserId: number;
  createdAt: any;
}
