import { PaymentMethod } from "../../enums/PaymentMethod";

export interface CreatePaymentRequest {
  amount: number;
  paymentMethod: PaymentMethod;
}
