import { OrderItem, IOrderItem } from "../entities/OrderItem";
import { AddOrderItemRequest } from "../dto/orderItem/AddOrderItemRequest";

export class OrderItemRepository {
  async findByOrderId(orderId: number): Promise<IOrderItem[]> {
    return OrderItem.find({ orderId }).sort({ id: 1 }).exec();
  }

  async findById(id: number): Promise<IOrderItem | null> {
    return OrderItem.findOne({ id }).exec();
  }

  async create(
    data: AddOrderItemRequest & { orderId: number; unitPrice: number },
  ): Promise<IOrderItem> {
    const lastItem = await OrderItem.findOne().sort({ id: -1 }).lean().exec();
    const nextId =
      lastItem && typeof lastItem.id === "number" ? lastItem.id + 1 : 1;

    const totalPrice = data.unitPrice * data.quantity;

    const item = new OrderItem({
      id: nextId,
      orderId: data.orderId,
      menuItemId: data.menuItemId,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
      totalPrice,
    });
    return item.save();
  }

  async delete(id: number): Promise<void> {
    await OrderItem.findOneAndDelete({ id });
  }
}
