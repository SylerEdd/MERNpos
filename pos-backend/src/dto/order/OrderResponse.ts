import { OrderStatus } from "../../enums/OrderStatus";
import { OrderItemResponse } from "../orderItem/OrderItemResponse";
import { PaymentResponse } from "../payment/PaymentResponse";

export interface OrderResponse {
  id: number;
  tabId: number;
  userId: number;
  totalAmount: number;
  status: OrderStatus;
  orderItems: OrderItemResponse[];
  openedAt: string;
  closedAt: string | null;
  createdAt: string;
  payments?: PaymentResponse[];
  totalPaid?: number;
  amountDue?: number;
}
