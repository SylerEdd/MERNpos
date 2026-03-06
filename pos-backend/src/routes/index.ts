import { Application } from "express";

export function registerRoutes(app: Application): void {
  // Add menu item routes
  app.use("/api/menu-items", require("./menuItemRoutes").menuItemRouter);

  // Health check
  app.get("/", (req, res) => {
    res.json({
      message: "POS API is running! 🎉",
      timestamp: new Date().toISOString(),
    });
  });
}
