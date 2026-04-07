import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

export const authRouter = Router();
const controller = new AuthController();

authRouter.post("/login", (req, res) => controller.login(req, res));
authRouter.post("/logout", (req, res) => controller.logout(req, res));
authRouter.get("/me", (req, res) => controller.me(req, res));
