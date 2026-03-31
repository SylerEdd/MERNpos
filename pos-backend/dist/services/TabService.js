"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabService = void 0;
const TabRepository_1 = require("../repositories/TabRepository");
const repo = new TabRepository_1.TabRepository();
function toResponse(entity) {
    return {
        id: entity.id,
        tableNumber: entity.tableNumber,
        tableStatus: entity.tableStatus,
        createdAt: entity.createdAt.toISOString(),
    };
}
class TabService {
    async getAll() {
        const tabs = await repo.findAll();
        return tabs.map(toResponse);
    }
    async getById(id) {
        const tab = await repo.findById(id);
        return tab ? toResponse(tab) : null;
    }
    async create(request) {
        if (!request.tableNumber) {
            throw new Error("Table number is required");
        }
        const created = await repo.create(request);
        return toResponse(created);
    }
    async update(id, request) {
        if (!request.tableNumber) {
            throw new Error("Table number is required");
        }
        const updated = await repo.update(id, request);
        if (!updated) {
            throw new Error("Tab not found");
        }
        return toResponse(updated);
    }
    async delete(id) {
        await repo.delete(id);
    }
}
exports.TabService = TabService;
