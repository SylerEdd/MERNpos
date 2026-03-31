"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabController = void 0;
const TabService_1 = require("../services/TabService");
const service = new TabService_1.TabService();
class TabController {
    async getAll(req, res) {
        const tabs = await service.getAll();
        res.json(tabs);
    }
    async getById(req, res) {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            res.status(400).json({ error: "Invalid tab id" });
            return;
        }
        const tab = await service.getById(id);
        if (!tab) {
            res.status(404).json({ error: "Tab not found" });
            return;
        }
        res.json(tab);
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
    async update(req, res) {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            res.status(400).json({ error: "Invalid tab id" });
            return;
        }
        try {
            const updated = await service.update(id, req.body);
            res.json(updated);
        }
        catch (err) {
            if (err.message === "Tab not found") {
                res.status(404).json({ message: err.message });
            }
            else {
                res.status(400).json({ message: err.message ?? "Invalid data" });
            }
        }
    }
    async delete(req, res) {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            res.status(400).json({ error: "Invalid tab id" });
            return;
        }
        await service.delete(id);
        res.status(204).send();
    }
}
exports.TabController = TabController;
