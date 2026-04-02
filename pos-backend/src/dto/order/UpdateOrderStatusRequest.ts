import { OrderStatus } from "../../enums/OrderStatus";

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}
