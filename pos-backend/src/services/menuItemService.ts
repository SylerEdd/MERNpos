import { MenuItemRepository } from "../repositories/menuItemRepository";
import { CreateMenuItemRequest } from "../dto/menuItem/CreateMenuItemRequest";
import { MenuItemResponse } from "../dto/menuItem/MenuItemResponse";
import { IMenuItem } from "../entities/MenuItem";
import { UpdateMenuItemRequest } from "../dto/menuItem/UpdateMenuItemRequest";

const repo = new MenuItemRepository();

// maps the menu item for response
function toResponse(entity: IMenuItem): MenuItemResponse {
  return {
    id: entity.id,
    name: entity.name,
    price: entity.price,
    section: entity.section,
    createdAt: entity.createdAt!.toISOString(),
  };
}

export class MenuItemService {
  // returns all menu items
  async getAll(): Promise<MenuItemResponse[]> {
    const items = await repo.findAll();
    return items.map(toResponse);
  }
  // returns menu item by id
  async getById(id: number): Promise<MenuItemResponse | null> {
    const item = await repo.findById(id);
    return item ? toResponse(item) : null;
  }

  // creates menu item
  async create(request: CreateMenuItemRequest): Promise<MenuItemResponse> {
    if (!request.name || request.price <= 0) {
      throw new Error("Invalid menu item data");
    }
    const created = await repo.create(request);
    return toResponse(created);
  }

  // updates a menu item
  async update(id: number, request: UpdateMenuItemRequest): Promise<MenuItemResponse> {
      if (!request.name) {
        throw new Error("Menu item name is required");
      }
      if (!request.price || request.price <= 0) {
        throw new Error("Price is required and must be bigger than 0");
      }
      const updated = await repo.update(id, request);
      if (!updated) {
        throw new Error("Menu item not found");
      }
      return toResponse(updated);
  }

  // delets an menu item
  async delete(id: number): Promise<void> {
    await repo.delete(id);
  }
}