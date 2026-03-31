"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemRepository = void 0;
const OrderItem_1 = require("../entities/OrderItem");
class OrderItemRepository {
    async findAll() {
        return OrderItem_1.OrderItem.find().exec();
    }
    async findById(id) {
        return OrderItem_1.OrderItem.findOne({ id }).exec();
    }
    async findByOrderId(orderId) {
        return OrderItem_1.OrderItem.find({ orderId }).exec();
    }
    async create(data) {
        const model = new OrderItem_1.OrderItem(data);
        return model.save();
    }
    async delete(id) {
        await OrderItem_1.OrderItem.findOneAndDelete({ id }).exec();
    }
}
exports.OrderItemRepository = OrderItemRepository;
