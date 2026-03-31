"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const RoleService_1 = require("../services/RoleService");
const service = new RoleService_1.RoleService();
class RoleController {
    async getAll(req, res) {
        const roles = await service.getAll();
        res.json(roles);
    }
    async getById(req, res) {
        const role = await service.getById(req.params.id);
        if (!role) {
            res.status(404).json({ message: "Role not found" });
            return;
        }
        res.json(role);
    }
    async getByName(req, res) {
        const role = await service.getByName(req.params.name);
        if (!role) {
            res.status(404).json({ message: "Role not found" });
            return;
        }
        res.json(role);
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
        try {
            const updated = await service.update(req.params.id, req.body);
            res.json(updated);
        }
        catch (err) {
            if (err.message === "Role not found") {
                res.status(404).json({ message: err.message });
            }
            else {
                res.status(400).json({ message: err.message ?? "Invalid data" });
            }
        }
    }
    async delete(req, res) {
        try {
            await service.delete(req.params.id);
            res.status(204).send();
        }
        catch (err) {
            res.status(404).json({ message: "Role not found" });
        }
    }
}
exports.RoleController = RoleController;
