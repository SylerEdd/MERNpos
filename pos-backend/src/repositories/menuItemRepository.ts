import { MenuItem, IMenuItem } from "../entities/MenuItem";
import { CreateMenuItemRequest } from "../dto/menuItem/CreateMenuItemRequest";

//create method will hash the password before saving to the database, we will use bcrypt for hashing
//findByUsername and findByEmail are used for authentication and validation purposes

export class MenuItemRepository {
  async findAll(): Promise<IMenuItem[]> {
    return MenuItem.find().sort({ id: 1 }).exec();
  }

  async findById(id: number): Promise<IMenuItem | null> {
    return MenuItem.findOne({ id }).exec();
  }

  async create(data: CreateMenuItemRequest): Promise<IMenuItem> {
    const lastItem = await MenuItem.findOne().sort({ id: -1 }).lean().exec();
    const nextId = lastItem && typeof lastItem.id === "number" ? lastItem.id + 1 : 1;

    const item = new MenuItem({ ...data, id: nextId });
    return item.save();
  }

  async update(
    id: number,
    data: Partial<CreateMenuItemRequest>,
  ): Promise<IMenuItem | null> {
    return MenuItem.findOneAndUpdate({ id }, data, { new: true }).exec();
  }

  async delete(id: number): Promise<void> {
    await MenuItem.findOneAndDelete({ id }).exec();
  }
}
