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

// GET /orders/:id/items
orderRouter.get(
  "/:id/items",
  authenticate,
  (req: Request<{ id: string }>, res) => controller.getItems(req, res),
);

orderRouter.post("/", authenticate, (req, res) => controller.create(req, res));

// POST /orders/:id/items
orderRouter.post(
  "/:id/items",
  authenticate,
  (req: Request<{ id: string }>, res) => controller.addItem(req, res),
);

// PUT /orders/:id/items/:itemId
orderRouter.put(
  "/:id/items/:itemId",
  authenticate,
  (req: Request<{ id: string; itemId: string }>, res) =>
    controller.updateItem(req, res),
);

// POST /orders/:id/pay
orderRouter.post(
  "/:id/pay",
  authenticate,
  authorize("MANAGER", "SUPERVISOR"),
  (req, res) => paymentController.pay(req, res),
);

// DELETE /orders/:id
orderRouter.delete(
  "/:id",
  authenticate,
  authorize("MANAGER", "SUPERVISOR"),
  (req: Request<{ id: string }>, res) => controller.delete(req, res),
);

// DELETE /orders/:id/items/:itemId
orderRouter.delete(
  "/:id/items/:itemId",
  authenticate,
  (req: Request<{ id: string; itemId: string }>, res) =>
    controller.removeItem(req, res),
);

orderRouter.patch(
  "/:id/status",
  authenticate,
  authorize("MANAGER", "SUPERVISOR"),
  (req: Request<{ id: string }>, res) => controller.updateStatus(req, res),
);
