"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const OrderRepository_1 = require("../repositories/OrderRepository");
const OrderItemRepository_1 = require("../repositories/OrderItemRepository");
const PaymentRepository_1 = require("../repositories/PaymentRepository");
const menuItemRepository_1 = require("../repositories/menuItemRepository");
const TabRepository_1 = require("../repositories/TabRepository");
const Order_1 = require("../entities/Order");
const OrderItem_1 = require("../entities/OrderItem");
const Payment_1 = require("../entities/Payment");
const TableStatus_1 = require("../enums/TableStatus");
const orderRepo = new OrderRepository_1.OrderRepository();
const orderItemRepo = new OrderItemRepository_1.OrderItemRepository();
const paymentRepo = new PaymentRepository_1.PaymentRepository();
const menuItemRepo = new menuItemRepository_1.MenuItemRepository();
const tabRepo = new TabRepository_1.TabRepository();
async function nextOrderId() {
    const lastOrder = await Order_1.Order.findOne().sort({ id: -1 }).exec();
    return lastOrder?.id ? lastOrder.id + 1 : 1;
}
async function nextOrderItemId() {
    const last = await OrderItem_1.OrderItem.findOne().sort({ id: -1 }).exec();
    return last?.id ? last.id + 1 : 1;
}
async function nextPaymentId() {
    const last = await Payment_1.Payment.findOne().sort({ id: -1 }).exec();
    return last?.id ? last.id + 1 : 1;
}
function mapOrderItemResponse(entity) {
    return {
        id: entity.id,
        menuItemId: entity.menuItemId,
        orderId: entity.orderId,
        quantity: entity.quantity,
        unitPrice: entity.unitPrice,
        totalPrice: entity.totalPrice,
    };
}
function mapOrderResponse(entity, items) {
    return {
        id: entity.id,
        tableId: entity.tableId,
        userId: entity.userId,
        orderItems: items.map(mapOrderItemResponse),
        totalAmount: entity.totalAmount,
        status: entity.status,
        openedAt: entity.openedAt.toISOString(),
        closedAt: entity.closedAt ? entity.closedAt.toISOString() : null,
    };
}
class OrderService {
    async create(request) {
        if (!request.tableId || !request.userId) {
            throw new Error("tableId and userId are required");
        }
        const orderId = await nextOrderId();
        const created = await orderRepo.create({ ...request, id: orderId });
        const table = await tabRepo.findById(request.tableId);
        if (table) {
            await tabRepo.update(request.tableId, { tableStatus: TableStatus_1.TableStatus.OPEN });
        }
        return mapOrderResponse(created, []);
    }
    async getById(orderId) {
        const order = await orderRepo.findById(orderId);
        if (!order)
            return null;
        const items = await orderItemRepo.findByOrderId(orderId);
        return mapOrderResponse(order, items);
    }
    async addItem(orderId, request) {
        if (!request.menuItemId || request.quantity <= 0) {
            throw new Error("menuItemId and positive quantity required");
        }
        const order = await orderRepo.findById(orderId);
        if (!order || order.status !== "OPEN") {
            throw new Error("Order not found or not open");
        }
        const menuItem = await menuItemRepo.findByNumericId(request.menuItemId);
        if (!menuItem) {
            throw new Error("Menu item not found");
        }
        const unitPrice = menuItem.price;
        const totalPrice = unitPrice * request.quantity;
        const orderItemId = await nextOrderItemId();
        const orderItem = await orderItemRepo.create({
            id: orderItemId,
            orderId,
            menuItemId: request.menuItemId,
            quantity: request.quantity,
            unitPrice,
            totalPrice,
        });
        order.orderItems.push(orderItem.id);
        order.totalAmount += totalPrice;
        await orderRepo.update(orderId, { orderItems: order.orderItems, totalAmount: order.totalAmount });
        return mapOrderItemResponse(orderItem);
    }
    async payAndClose(orderId) {
        const order = await orderRepo.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        if (order.status !== "OPEN") {
            throw new Error("Only open orders can be closed");
        }
        const paymentId = await nextPaymentId();
        await paymentRepo.create({
            id: paymentId,
            orderId,
            amount: order.totalAmount,
            paidAt: new Date(),
        });
        order.status = "CLOSED";
        order.closedAt = new Date();
        await orderRepo.update(orderId, { status: "CLOSED", closedAt: order.closedAt });
        await tabRepo.update(order.tableId, { tableStatus: TableStatus_1.TableStatus.CLOSED });
        const items = await orderItemRepo.findByOrderId(orderId);
        return mapOrderResponse(order, items);
    }
}
exports.OrderService = OrderService;
