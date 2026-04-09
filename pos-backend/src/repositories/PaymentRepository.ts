import { IPayment, Payment } from "../entities/Payment";
import { CreatePaymentRequest } from "../dto/payment/CreatePaymentRequest";

export class PaymentRepository {
  async findByOrderId(orderId: number): Promise<IPayment[]> {
    return Payment.find({ orderId }).sort({ createdAt: 1 }).exec();
  }

  async create(
    orderId: number,
    processedByUserId: number,
    data: CreatePaymentRequest,
  ): Promise<IPayment> {
    const last = await Payment.findOne().sort({ id: -1 }).exec();
    const nextId = last ? last.id + 1 : 1;

    const payment = new Payment({
      id: nextId,
      orderId,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      processedByUserId,
    });

    return payment.save();
  }
}
