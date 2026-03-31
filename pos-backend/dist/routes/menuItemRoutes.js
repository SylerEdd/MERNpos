"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemRouter = void 0;
const express_1 = require("express");
const menuItemController_1 = require("../controller/menuItemController");
exports.menuItemRouter = (0, express_1.Router)();
const controller = new menuItemController_1.MenuItemController();
exports.menuItemRouter.get("/", (req, res) => controller.getAll(req, res));
exports.menuItemRouter.get("/:id", (req, res) => controller.getById(req, res));
exports.menuItemRouter.post("/", (req, res) => controller.create(req, res));
exports.menuItemRouter.put("/:id", (req, res) => {
    res.status(501).json({ message: "Update not implemented yet" });
});
exports.menuItemRouter.delete("/:id", (req, res) => {
    res.status(501).json({ message: "Delete not implemented yet" });
});
