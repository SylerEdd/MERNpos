import { MenuItemRepository } from "../repositories/menuItemRepository";
import { CreateMenuItemRequest } from "../dto/menuItem/CreateMenuItemRequest";
import { MenuItemResponse } from "../dto/menuItem/MenuItemResponse";
import { IMenuItem } from "../entities/MenuItem";

const repo = new MenuItemRepository();

function toResponse(entity: IMenuItem): MenuItemResponse {
  return {
    id: entity._id!.toString(),
    name: entity.name,
    price: entity.price,
    section: entity.section,
    createdAt: entity.createdAt!.toISOString(),
  };
}

export class MenuItemService {
  async getAll(): Promise<MenuItemResponse[]> {
    const items = await repo.findAll();
    return items.map(toResponse);
  }

  async getById(id: string): Promise<MenuItemResponse | null> {
    const item = await repo.findById(id);
    return item ? toResponse(item) : null;
  }

  async create(request: CreateMenuItemRequest): Promise<MenuItemResponse> {
    if (!request.name || request.price <= 0) {
      throw new Error("Invalid menu item data");
    }
    const created = await repo.create(request);
    return toResponse(created);
  }
}
