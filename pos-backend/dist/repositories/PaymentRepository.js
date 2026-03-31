"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const Payment_1 = require("../entities/Payment");
class PaymentRepository {
    async findAll() {
        return Payment_1.Payment.find().exec();
    }
    async findById(id) {
        return Payment_1.Payment.findOne({ id }).exec();
    }
    async create(data) {
        const model = new Payment_1.Payment(data);
        return model.save();
    }
}
exports.PaymentRepository = PaymentRepository;
