import { Router } from "express";
import { RoleController } from "../controller/RoleController";

export const roleRouter = Router();
const controller = new RoleController();

roleRouter.get("/", controller.getAll.bind(controller));
roleRouter.get("/:id", controller.getById.bind(controller));
roleRouter.post("/", controller.create.bind(controller));
roleRouter.put("/:id", controller.update.bind(controller));
roleRouter.delete("/:id", controller.delete.bind(controller));
