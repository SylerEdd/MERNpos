import { Order, IOrder } from "../entities/Order";
import { OrderStatus } from "../enums/OrderStatus";
import { CreateOrderRequest } from "../dto/order/CreateOrderRequest";

export class OrderRepository {
  // request from the database and return all orders
  async findAll(): Promise<IOrder[]> {
    return Order.find().sort({ id: 1 }).exec();
  }
  // request from the database and return order with that id
  async findById(id: number): Promise<IOrder | null> {
    return Order.findOne({ id }).exec();
  }

  // return orders by tabId
  async findOpenByTabId(tabId: number): Promise<IOrder | null> {
    return Order.findOne({
      tabId,
      status: OrderStatus.OPEN,
    }).exec();
  }

  // create orders
  async create(data: CreateOrderRequest): Promise<IOrder> {
    // creating sequential ids
    const lastOrder = await Order.findOne().sort({ id: -1 }).lean().exec();
    const nextId =
      lastOrder && typeof lastOrder.id === "number" ? lastOrder.id + 1 : 1;

    const order = new Order({ id: nextId, ...data });
    return order.save();
  }

  // update the order status
  async updateStatus(id: number, status: OrderStatus): Promise<IOrder | null> {
    const update: any = { status };

    if (status === OrderStatus.CLOSED || status === OrderStatus.CANCELLED) {
      update.closedAt = new Date();
    }

    return Order.findOneAndUpdate({ id }, update, {
      returnDocument: "after",
    }).exec();
  }

  // update the total amount of the order
  async updateTotal(id: number, totalAmount: number): Promise<void> {
    await Order.findOneAndUpdate({ id }, { totalAmount }).exec();
  }

  // delete the order
  async delete(id: number): Promise<void> {
    await Order.deleteOne({ id }).exec();
  }
}
