import { MenuItem, IMenuItem } from "../entities/MenuItem";
import { CreateMenuItemRequest } from "../dto/menuItem/CreateMenuItemRequest";

export class MenuItemRepository {
  async findAll(): Promise<IMenuItem[]> {
    return MenuItem.find().exec();
  }

  async findById(id: string): Promise<IMenuItem | null> {
    return MenuItem.findById(id).exec();
  }

  async create(data: CreateMenuItemRequest): Promise<IMenuItem> {
    const item = new MenuItem(data);
    return item.save();
  }

  async update(
    id: string,
    data: Partial<CreateMenuItemRequest>,
  ): Promise<IMenuItem | null> {
    return MenuItem.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await MenuItem.findByIdAndDelete(id).exec();
  }
}
