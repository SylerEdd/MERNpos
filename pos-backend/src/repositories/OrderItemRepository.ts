import { OrderItem, IOrderItem } from "../entities/OrderItem";
import { AddOrderItemRequest } from "../dto/orderItem/AddOrderItemRequest";

export class OrderItemRepository {
  // request from the database and return all the items that are in the order
  async findByOrderId(orderId: number): Promise<IOrderItem[]> {
    return OrderItem.find({ orderId }).sort({ id: 1 }).exec();
  }

  // request from the database and return orderitem with that id
  async findById(id: number): Promise<IOrderItem | null> {
    return OrderItem.findOne({ id }).exec();
  }

  // creating orderitem
  async create(
    data: AddOrderItemRequest & { orderId: number; unitPrice: number },
  ): Promise<IOrderItem> {
    // creating sequential id
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

  // update the orderitem
  async update(
    id: number,
    data: Partial<AddOrderItemRequest> & { unitPrice?: number },
  ): Promise<IOrderItem | null> {
    const update: any = {};
    if (data.menuItemId !== undefined) {
      update.menuItemId = data.menuItemId;
    }
    if (data.quantity !== undefined) {
      update.quantity = data.quantity;
    }
    // in case if the customer gets a discount or get a free item
    if (data.unitPrice !== undefined) {
      update.unitPrice = data.unitPrice;
    }
    if (update.quantity !== undefined || update.unitPrice !== undefined) {
      const item = await this.findById(id);
      if (!item) {
        throw new Error("Order item not found");
      }
      update.totalPrice = update.quantity * update.unitPrice;
    }

    return OrderItem.findOneAndUpdate({ id }, update, {
      returnDocument: "after",
    }).exec();
  }

  //deleting the orderitem
  async delete(id: number): Promise<void> {
    await OrderItem.findOneAndDelete({ id });
  }
}
