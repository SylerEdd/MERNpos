import { Application } from "express";
import { authRouter } from "./authRoutes";

export function registerRoutes(app: Application): void {
  app.use("/api/auth", authRouter);
  app.use("/api/menu-items", require("./menuItemRoutes").menuItemRouter);
  app.use("/api/roles", require("./roleRoutes").roleRouter);
  app.use("/api/users", require("./userRoutes").userRouter);
  app.use("/api/tabs", require("./tabRoutes").tabRouter);
  app.use("/api/orders", require("./orderRoutes").orderRouter);

  // Health check
  app.get("/", (req, res) => {
    res.json({
      message: "POS API is running!",
    });
  });
}
