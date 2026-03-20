import { Application } from "express";

export function registerRoutes(app: Application): void {
  // Add menu item routes
  app.use("/api/menu-items", require("./menuItemRoutes").menuItemRouter);
  app.use("/api/roles", require("./roleRoutes").roleRouter);
  app.use("/api/users", require("./userRoutes").userRouter);

  // Health check
  app.get("/", (req, res) => {
    res.json({
      message: "POS API is running!",
    });
  });
}
