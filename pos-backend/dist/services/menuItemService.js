"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemService = void 0;
const menuItemRepository_1 = require("../repositories/menuItemRepository");
const MenuItem_1 = require("../entities/MenuItem");
const repo = new menuItemRepository_1.MenuItemRepository();
async function nextMenuItemId() {
    const last = await MenuItem_1.MenuItem.findOne().sort({ id: -1 }).exec();
    return last?.id ? last.id + 1 : 1;
}
function toResponse(entity) {
    return {
        id: entity._id.toString(),
        numericId: entity.id,
        name: entity.name,
        price: entity.price,
        sectionId: entity.sectionId,
        createdAt: entity.createdAt.toISOString(),
    };
}
class MenuItemService {
    async getAll() {
        const items = await repo.findAll();
        return items.map(toResponse);
    }
    async getById(id) {
        const item = await repo.findById(id);
        return item ? toResponse(item) : null;
    }
    async create(request) {
        if (!request.name || request.price <= 0 || !request.sectionId || request.sectionId <= 0) {
            throw new Error("Invalid menu item data");
        }
        const menuItemId = request.id && request.id > 0 ? request.id : await nextMenuItemId();
        const created = await repo.create({
            ...request,
            id: menuItemId,
        });
        return toResponse(created);
    }
    // async update(id: string, request: CreateMenuItemRequest): Promise<MenuItemResponse> {
    //   if (!request.name || request.price <= 0 || !request.section) {
    //     throw new Error("Invalid menu item data");
    //   }
    //   const updated = await repo.update(id, request);
    //   return toResponse(updated);
    // }
    async delete(id) {
        await repo.delete(id);
    }
}
exports.MenuItemService = MenuItemService;
