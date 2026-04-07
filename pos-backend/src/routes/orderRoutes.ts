import { Router } from "express";
import { OrderController } from "../controller/OrderController";

export const orderRouter = Router();
const controller = new OrderController();

orderRouter.get("/", (req, res) => controller.getAll(req, res));
orderRouter.get("/:id", (req, res) => controller.getById(req, res));
orderRouter.post("/", (req, res) => controller.create(req, res));
orderRouter.post("/:id/items", (req, res) => controller.addItem(req, res));
orderRouter.delete("/:id/items/:itemId", (req, res) =>
  controller.removeItem(req, res),
);
orderRouter.patch("/:id/status", (req, res) =>
  controller.updateStatus(req, res),
);

orderRouter.put("/:id", (req, res) => {
  res.status(501).json({ message: "Update not implemented yet" });
});

orderRouter.delete("/:id", (req, res) => {
  res.status(501).json({ message: "Delete not implemented yet" });
});
