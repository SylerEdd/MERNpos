import { Router } from "express";
import { TabController } from "../controller/TabController";

export const tabRouter = Router();
const controller = new TabController();

tabRouter.get("/", (req, res) => controller.getAll(req, res));
tabRouter.get("/:id", (req, res) => controller.getById(req, res));
tabRouter.post("/", (req, res) => controller.create(req, res));
tabRouter.put("/:id", (req, res) => controller.update(req, res));
tabRouter.delete("/:id", (req, res) => controller.delete(req, res));
// updating the only tablestatus
tabRouter.patch("/:id/status", (req, res) => controller.updateStatus(req, res));
