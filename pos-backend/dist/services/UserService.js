"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const repo = new UserRepository_1.UserRepository();
function toResponse(entity) {
    const roles = Array.isArray(entity.roles) ? entity.roles : [];
    return {
        id: entity.id,
        fullName: entity.fullName,
        username: entity.username,
        email: entity.email,
        roles: roles.map((role) => {
            if (role && typeof role === "object") {
                return role.name || role.toString();
            }
            return String(role);
        }),
        createdAt: entity.createdAt
            ? entity.createdAt.toISOString()
            : new Date().toISOString(),
    };
}
class UserService {
    async getAll() {
        const users = await repo.findAll();
        return users.map(toResponse);
    }
    async getById(id) {
        const user = await repo.findById(id);
        return user ? toResponse(user) : null;
    }
    async getByUsername(username) {
        const user = await repo.findByUsername(username);
        return user ? toResponse(user) : null;
    }
    async create(request) {
        if (!request.fullName ||
            !request.username ||
            !request.email ||
            !request.password ||
            !request.roles) {
            throw new Error("Full name, username, email, password and roles are required");
        }
        const created = await repo.create(request);
        return toResponse(created);
    }
    // now we patch only some fields of the user, not all fields like in update method
    async patch(id, request) {
        const updated = await repo.patch(id, request);
        if (!updated) {
            throw new Error("User not found");
        }
        return toResponse(updated);
    }
    async delete(id) {
        await repo.delete(id);
    }
}
exports.UserService = UserService;
