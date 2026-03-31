"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
function registerRoutes(app) {
    // Add menu item routes
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
