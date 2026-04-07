import { Order, IOrder } from "../entities/Order";
import { OrderStatus } from "../enums/OrderStatus";
import { CreateOrderRequest } from "../dto/order/CreateOrderRequest";

export class OrderRepository {
  async findAll(): Promise<IOrder[]> {
    return Order.find().sort({ id: 1 }).exec();
  }

  async findById(id: number): Promise<IOrder | null> {
    return Order.findOne({ id }).exec();
  }

  async findOpenByTabId(tabId: number): Promise<IOrder | null> {
    return Order.findOne({
      tabId,
      status: OrderStatus.OPEN,
    }).exec();
  }

  async create(data: CreateOrderRequest): Promise<IOrder> {
    const lastOrder = await Order.findOne().sort({ id: -1 }).lean().exec();
    const nextId =
      lastOrder && typeof lastOrder.id === "number" ? lastOrder.id + 1 : 1;

    const order = new Order({ id: nextId, ...data });
    return order.save();
  }

  async updateStatus(id: number, status: OrderStatus): Promise<IOrder | null> {
    const update: any = { status };

    if (status === OrderStatus.CLOSED || status === OrderStatus.CANCELLED) {
      update.closedAt = new Date();
    }

    return Order.findOneAndUpdate({ id }, update, { new: true }).exec();
  }

  async updateTotal(id: number, totalAmount: number): Promise<void> {
    await Order.findOneAndUpdate({ id }, { totalAmount }).exec();
  }
}
