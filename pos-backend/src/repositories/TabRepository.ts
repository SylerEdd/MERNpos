import { Tab, ITab } from "../entities/Tab";
import { CreateTabRequest } from "../dto/tab/CreateTabRequest";

//There was a problem with the name Table so i named the table to Tab
export class TabRepository {
  // insert a new table
  async create(data: CreateTabRequest): Promise<ITab> {
    //creating sequential id
    const lastTab = await Tab.findOne().sort({ id: -1 }).exec();
    const nextId = lastTab ? lastTab.id + 1 : 1;

    const tab = new Tab({ ...data, id: nextId });
    return tab.save();
  }

  // request from the database and return all tables
  async findAll(): Promise<ITab[]> {
    return Tab.find().exec();
  }

  //request from the database and return a table with that id
  async findById(id: number): Promise<ITab | null> {
    return Tab.findOne({ id }).exec();
  }

  // update table
  async update(
    id: number,
    data: Partial<CreateTabRequest>,
  ): Promise<ITab | null> {
    return Tab.findOneAndUpdate({ id }, data, {
      returnDocument: "after",
    }).exec();
  }

  // delete table
  async delete(id: number): Promise<void> {
    await Tab.findOneAndDelete({ id }).exec();
  }
}
