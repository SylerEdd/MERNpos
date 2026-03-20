import { Router } from "express";
import { UserController } from "../controller/UserController";

export const userRouter = Router();
const controller = new UserController();

userRouter.get("/", controller.getAll.bind(controller));
userRouter.get("/:id", controller.getById.bind(controller));
userRouter.post("/", controller.create.bind(controller));
userRouter.patch("/:id", controller.patch.bind(controller));
userRouter.delete("/:id", controller.delete.bind(controller));

userRouter.get(
  "/username/:username",
  controller.getByUsername.bind(controller),
);
