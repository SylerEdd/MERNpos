import { Router, Request, Response } from "express";
import { PaymentController } from "../controller/PaymentController";
import { OrderController } from "../controller/OrderController";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const paymentController = new PaymentController();
export const orderRouter = Router();
const controller = new OrderController();

orderRouter.get("/", authenticate, (req, res) => controller.getAll(req, res));
orderRouter.get("/:id", authenticate, (req: Request<{ id: string }>, res) =>
  controller.getById(req, res),
);

orderRouter.post("/", authenticate, (req, res) => controller.create(req, res));

orderRouter.post(
  "/:id/items",
  authenticate,
  (req: Request<{ id: string }>, res) => controller.addItem(req, res),
);

// POST /orders/:id/pay
orderRouter.post(
  "/:id/pay",
  authenticate,
  authorize("MANAGER", "SUPERVISOR"),
  (req, res) => paymentController.pay(req, res),
);

orderRouter.delete(
  "/:id/items/:itemId",
  authenticate,
  authorize("MANAGER", "SUPERVISOR"),
  (req: Request<{ id: string; itemId: string }>, res) =>
    controller.removeItem(req, res),
);

orderRouter.patch(
  "/:id/status",
  authenticate,
  authorize("MANAGER", "SUPERVISOR"),
  (req: Request<{ id: string }>, res) => controller.updateStatus(req, res),
);
