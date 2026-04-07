import { OrderStatus } from "../../enums/OrderStatus";
import { OrderItemResponse } from "../orderItem/OrderItemResponse";

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
}
