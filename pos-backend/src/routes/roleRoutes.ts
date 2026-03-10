import { Router } from "express";
import { RoleController } from "../controller/RoleController";

export const roleRouter = Router();
const controller = new RoleController();

roleRouter.get("/", (req, res) => controller.getAll(req, res));
roleRouter.get("/:id", (req, res) => controller.getById(req, res));
roleRouter.post("/", (req, res) => controller.create(req, res));
roleRouter.put("/:id", (req, res) => controller.update(req, res));
roleRouter.delete("/:id", (req, res) => controller.delete(req, res));
