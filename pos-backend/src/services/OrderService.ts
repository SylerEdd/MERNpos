import { OrderItemRepository } from "../repositories/OrderItemRepository";
import { OrderRepository } from "../repositories/OrderRepository";
import { MenuItemRepository } from "../repositories/menuItemRepository";
import { TabRepository } from "../repositories/TabRepository";
import { CreateOrderRequest } from "../dto/order/CreateOrderRequest";
import { OrderResponse } from "../dto/order/OrderResponse";
import { AddOrderItemRequest } from "../dto/orderItem/AddOrderItemRequest";
import { OrderItemResponse } from "../dto/orderItem/OrderItemResponse";
import { IOrder } from "../entities/Order";
import { IOrderItem } from "../entities/OrderItem";
import { OrderStatus } from "../enums/OrderStatus";
import { TableStatus } from "../enums/TableStatus";
import { PaymentRepository } from "../repositories/PaymentRepository";
import { CreatePaymentRequest } from "../dto/payment/CreatePaymentRequest";
import { PaymentResponse } from "../dto/payment/PaymentResponse";
import { IPayment } from "../entities/Payment";

// maps the orderItem entity and menu item name to response
function toItemResponse(
  entity: IOrderItem,
  menuItemName: string,
): OrderItemResponse {
  return {
    id: entity.id,
    orderId: entity.orderId,
    menuItemId: entity.menuItemId,
    menuItemName,
    quantity: entity.quantity,
    unitPrice: entity.unitPrice,
    totalPrice: entity.totalPrice,
    createdAt: entity.createdAt.toISOString(),
  };
}

// maps the Order entity and orderItem response to response
function toOrderResponse(
  entity: IOrder,
  items: OrderItemResponse[],
): OrderResponse {
  return {
    id: entity.id,
    tabId: entity.tabId,
    userId: entity.userId,
    totalAmount: entity.totalAmount,
    status: entity.status,
    orderItems: items,
    openedAt: entity.openedAt
      ? new Date(entity.openedAt).toISOString()
      : new Date().toISOString(),
    closedAt: entity.closedAt ? new Date(entity.closedAt).toISOString() : null,
    createdAt: entity.createdAt
      ? new Date(entity.createdAt).toISOString()
      : new Date().toISOString(),
  };
}

// maps the payment entity to response
function toPaymentResponse(entity: IPayment): PaymentResponse {
  return {
    id: entity.id,
    orderId: entity.orderId,
    amount: entity.amount,
    paymentMethod: entity.paymentMethod,
    processedByUserId: entity.processedByUserId,
    createdAt: entity.createdAt.toISOString(),
  };
}

const paymentRepository = new PaymentRepository();
const orderRepository = new OrderRepository();
const orderItemRepository = new OrderItemRepository();
const menuItemRepository = new MenuItemRepository();
const tabRepository = new TabRepository();

export class OrderService {
  // constructing DTO here
  private async buildResponse(order: IOrder): Promise<OrderResponse> {
    const items = await orderItemRepository.findByOrderId(order.id);
    const allMenuItems = await menuItemRepository.findAll();
    const payments = await paymentRepository.findByOrderId(order.id);

    // build a map for name look ups
    const menuMap = new Map(allMenuItems.map((m) => [m.id, m.name]));

    const paymentResponses = payments.map(toPaymentResponse);

    const itemResponses = items.map((item) =>
      toItemResponse(item, menuMap.get(item.menuItemId) ?? "Unknown Item"),
    );

    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const amountDue = order.totalAmount - totalPaid;

    const base = toOrderResponse(order, itemResponses);
    return {
      ...base,
      payments: paymentResponses,
      totalPaid,
      amountDue,
    };
  }

  // returns all orders
  async getAll(): Promise<OrderResponse[]> {
    const orders = await orderRepository.findAll();
    return Promise.all(orders.map((order) => this.buildResponse(order)));
  }

  // returns one order by id
  async getById(id: number): Promise<OrderResponse | null> {
    const order = await orderRepository.findById(id);
    return order ? this.buildResponse(order) : null;
  }

  // creates new order on a tab
  async create(request: CreateOrderRequest): Promise<OrderResponse> {
    if (!request.tabId || !request.userId) {
      throw new Error("tabId and userId are required");
    }

    // Validate tab exists
    const tab = await tabRepository.findById(request.tabId);
    if (!tab) {
      throw new Error("Tab not found");
    }

    // Prevent opening a second order on the same tab
    const existingOpen = await orderRepository.findOpenByTabId(request.tabId);
    if (existingOpen) {
      throw new Error("An open order already exists for this tab");
    }

    const created = await orderRepository.create(request);

    // changes the tab status to OCCUPIED
    await tabRepository.update(request.tabId, {
      tableStatus: TableStatus.OCCUPIED,
    });
    return this.buildResponse(created);
  }

  // adds items to the OPEN order
  async addItem(
    orderId: number,
    request: AddOrderItemRequest,
  ): Promise<OrderResponse> {
    const order = await orderRepository.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== OrderStatus.OPEN) {
      throw new Error("Cannot add items to a closed order");
    }

    const menuItem = await menuItemRepository.findById(request.menuItemId);
    if (!menuItem) {
      throw new Error("Menu item not found");
    }

    await orderItemRepository.create({
      orderId,
      menuItemId: request.menuItemId,
      quantity: request.quantity,
      unitPrice: menuItem.price,
    });

    // Recalculate total after adding item
    await this.recalculateTotal(orderId);

    const updated = await orderRepository.findById(orderId);

    return this.buildResponse(updated!);
  }

  // removes an item from the opoen order
  async removeItem(orderId: number, itemId: number): Promise<OrderResponse> {
    const order = await orderRepository.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status !== OrderStatus.OPEN) {
      throw new Error("Cannot remove items from a closed order");
    }

    const item = await orderItemRepository.findById(itemId);
    if (!item) {
      throw new Error("Order item not found");
    }

    await orderItemRepository.delete(itemId);

    // Recalculate total after removing item
    await this.recalculateTotal(orderId);

    const updated = await orderRepository.findById(orderId);
    return this.buildResponse(updated!);
  }

  // changes the status of the open order
  async updateStatus(id: number, status: OrderStatus): Promise<OrderResponse> {
    const order = await orderRepository.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status !== OrderStatus.OPEN) {
      throw new Error("Only open orders can be updated");
    }

    const updated = await orderRepository.updateStatus(id, status);

    // If order is closed or cancelled, free up the table
    if (status === OrderStatus.CLOSED || status === OrderStatus.CANCELLED) {
      await tabRepository.update(order.tabId, {
        tableStatus: TableStatus.FREE,
      });
    }
    return this.buildResponse(updated!);
  }

  // records a payment on an open order
  async recordPayment(
    orderId: number,
    request: CreatePaymentRequest,
    processedByUserId: number,
  ): Promise<OrderResponse> {
    const order = await orderRepository.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status !== OrderStatus.OPEN) {
      throw new Error("Cannot record payment for a closed order");
    }

    //Calculate total paid so far
    const existingPayments = await paymentRepository.findByOrderId(orderId);
    const alreadyPaid = existingPayments.reduce((sum, p) => sum + p.amount, 0);

    const newTotalPaid = alreadyPaid + request.amount;
    if (newTotalPaid > order.totalAmount) {
      throw new Error("Payment exceeds total amount due");
    }

    // Record the new payment
    await paymentRepository.create(orderId, processedByUserId, request);

    // If fully paid, close the order
    if (newTotalPaid === order.totalAmount) {
      await this.updateStatus(orderId, OrderStatus.CLOSED);
    }

    const updated = await orderRepository.findById(orderId);
    return this.buildResponse(updated!);
  }

  //sums all order items and updates the order's totalAmount
  private async recalculateTotal(orderId: number): Promise<void> {
    const items = await orderItemRepository.findByOrderId(orderId);
    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
    await orderRepository.updateTotal(orderId, total);
  }
}
