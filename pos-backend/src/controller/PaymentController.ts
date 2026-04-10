import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";

const service = new OrderService();

export class PaymentController {
  // POST /api/
  async pay(req: Request, res: Response): Promise<void> {
    try {
      const orderId = Number(req.params.id);
      if (!orderId) {
        res.status(400).json({ error: "Invalid order ID" });
        return;
      }

      //userId comes from session will be set during the login
      const sess: any = req.session;
      if (!sess.userId) {
        res.status(401).json({ message: "Not authenticated" });
        return;
      }

      const result = await service.recordPayment(
        orderId,
        req.body,
        sess.userId,
      );
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message ?? "Invalid data" });
    }
  }
}
