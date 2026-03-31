"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const RoleRepository_1 = require("../repositories/RoleRepository");
const repo = new RoleRepository_1.RoleRepository();
function toResponse(entity) {
    return {
        id: entity.id,
        name: entity.name,
        createdAt: entity.createdAt.toISOString(),
    };
}
class RoleService {
    async getAll() {
        const roles = await repo.findAll();
        return roles.map(toResponse);
    }
    async getById(id) {
        const role = await repo.findById(id);
        return role ? toResponse(role) : null;
    }
    async getByName(name) {
        const role = await repo.findByName(name);
        return role ? toResponse(role) : null;
    }
    async create(request) {
        if (!request.name) {
            throw new Error("Role name is required");
        }
        const created = await repo.create(request);
        return toResponse(created);
    }
    async update(id, request) {
        if (!request.name) {
            throw new Error("Role name is required");
        }
        const updated = await repo.update(id, request);
        if (!updated) {
            throw new Error("Role not found");
        }
        return toResponse(updated);
    }
    async delete(id) {
        await repo.delete(id);
    }
}
exports.RoleService = RoleService;
