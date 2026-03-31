"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const service = new UserService_1.UserService();
class UserController {
    async getAll(req, res) {
        const users = await service.getAll();
        res.json(users);
    }
    async getById(req, res) {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            res.status(400).json({ message: "Invalid user id" });
            return;
        }
        const user = await service.getById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    async getByUsername(req, res) {
        const user = await service.getByUsername(req.params.username);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
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
    async patch(req, res) {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) {
            res.status(400).json({ message: "Invalid user id" });
            return;
        }
        try {
            const updated = await service.patch(id, req.body);
            res.json(updated);
        }
        catch (err) {
            if (err.message === "User not found") {
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
            res.status(400).json({ message: "Invalid user id" });
            return;
        }
        try {
            await service.delete(id);
            res.status(204).send();
        }
        catch (err) {
            res.status(404).json({ message: "User not found" });
        }
    }
}
exports.UserController = UserController;
