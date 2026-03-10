import { Router } from "express";
import { MenuItemController } from "../controller/menuItemController";

export const menuItemRouter = Router();
const controller = new MenuItemController();

menuItemRouter.get("/", (req, res) => controller.getAll(req, res));
menuItemRouter.get("/:id", (req, res) => controller.getById(req, res));
menuItemRouter.post("/", (req, res) => controller.create(req, res));

menuItemRouter.put("/:id", (req, res) => {
  res.status(501).json({ message: "Update not implemented yet" });
});

menuItemRouter.delete("/:id", (req, res) => {
  res.status(501).json({ message: "Delete not implemented yet" });
});
