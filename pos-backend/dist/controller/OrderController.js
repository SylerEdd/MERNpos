"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const OrderService_1 = require("../services/OrderService");
const service = new OrderService_1.OrderService();
class OrderController {
    async create(req, res) {
        try {
            const order = await service.create(req.body);
            res.status(201).json(order);
        }
        catch (error) {
            res.status(400).json({ message: error.message || "Invalid order data" });
        }
    }
    async getById(req, res) {
        const orderId = Number(req.params.id);
        if (Number.isNaN(orderId)) {
            res.status(400).json({ message: "Invalid order id" });
            return;
        }
        const order = await service.getById(orderId);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        res.json(order);
    }
    async addItem(req, res) {
        const orderId = Number(req.params.id);
        if (Number.isNaN(orderId)) {
            res.status(400).json({ message: "Invalid order id" });
            return;
        }
        try {
            const item = await service.addItem(orderId, req.body);
            res.status(201).json(item);
        }
        catch (error) {
            res.status(400).json({ message: error.message || "Invalid ordered item" });
        }
    }
    async close(req, res) {
        const orderId = Number(req.params.id);
        if (Number.isNaN(orderId)) {
            res.status(400).json({ message: "Invalid order id" });
            return;
        }
        try {
            const order = await service.payAndClose(orderId);
            res.json(order);
        }
        catch (error) {
            res.status(400).json({ message: error.message || "Unable to close order" });
        }
    }
}
exports.OrderController = OrderController;
