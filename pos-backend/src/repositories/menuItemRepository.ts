import { MenuItem, IMenuItem } from "../entities/MenuItem";
import { CreateMenuItemRequest } from "../dto/menuItem/CreateMenuItemRequest";

//create method will hash the password before saving to the database, we will use bcrypt for hashing

export class MenuItemRepository {
  //request from the database and return all the menutiems
  async findAll(): Promise<IMenuItem[]> {
    return MenuItem.find().sort({ id: 1 }).exec();
  }

  //request from the database and return the menuitem with that id
  async findById(id: number): Promise<IMenuItem | null> {
    return MenuItem.findOne({ id }).exec();
  }

  // creates a menuitem
  async create(data: CreateMenuItemRequest): Promise<IMenuItem> {
    //creating a sequential id
    const lastItem = await MenuItem.findOne().sort({ id: -1 }).lean().exec();
    const nextId =
      lastItem && typeof lastItem.id === "number" ? lastItem.id + 1 : 1;

    const item = new MenuItem({ ...data, id: nextId });
    return item.save();
  }

  // update the menu item
  async update(
    id: number,
    data: Partial<CreateMenuItemRequest>,
  ): Promise<IMenuItem | null> {
    return MenuItem.findOneAndUpdate({ id }, data, {
      returnDocument: "after",
    }).exec();
  }

  // delete a menu item
  async delete(id: number): Promise<void> {
    await MenuItem.findOneAndDelete({ id }).exec();
  }
}
