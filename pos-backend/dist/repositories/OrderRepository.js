"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const Order_1 = require("../entities/Order");
class OrderRepository {
    async findAll() {
        return Order_1.Order.find().exec();
    }
    async findById(id) {
        return Order_1.Order.findOne({ id }).exec();
    }
    async findByIdRaw(id) {
        return this.findById(id);
    }
    async create(data) {
        const model = new Order_1.Order(data);
        return model.save();
    }
    async update(id, data) {
        return Order_1.Order.findOneAndUpdate({ id }, data, { new: true }).exec();
    }
    async delete(id) {
        await Order_1.Order.findOneAndDelete({ id }).exec();
    }
}
exports.OrderRepository = OrderRepository;
