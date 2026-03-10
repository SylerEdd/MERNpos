import { MenuItem, IMenuItem } from "../entities/MenuItem";
import { CreateMenuItemRequest } from "../dto/menuItem/CreateMenuItemRequest";

//create method will hash the password before saving to the database, we will use bcrypt for hashing
//findByUsername and findByEmail are used for authentication and validation purposes

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
