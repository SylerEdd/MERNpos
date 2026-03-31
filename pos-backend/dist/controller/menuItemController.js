"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemController = void 0;
const menuItemService_1 = require("../services/menuItemService");
const service = new menuItemService_1.MenuItemService();
class MenuItemController {
    async getAll(req, res) {
        const items = await service.getAll();
        res.json(items);
    }
    async getById(req, res) {
        const idNum = Number(req.params.id);
        if (Number.isNaN(idNum)) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const item = await service.getById(idNum);
        if (!item) {
            res.status(404).json({ message: "Menu item not found" });
            return;
        }
        res.json(item);
    }
    async create(req, res) {
        try {
            const created = await service.create(req.body);
            res.status(201).json(created);
        }
        catch (err) {
            res.status(400).json({ message: err.message ?? "Invalid data" });
        }
    }
}
exports.MenuItemController = MenuItemController;
