import { Tab, ITab } from "../entities/Tab";
import { CreateTabRequest } from "../dto/tab/CreateTabRequest";

export class TabRepository {
  async create(data: CreateTabRequest): Promise<ITab> {
    const lastTab = await Tab.findOne().sort({ id: -1 }).exec();
    const nextId = lastTab ? lastTab.id + 1 : 1;

    const tab = new Tab({ ...data, id: nextId });
    return tab.save();
  }

  async findAll(): Promise<ITab[]> {
    return Tab.find().exec();
  }

  async findById(id: number): Promise<ITab | null> {
    return Tab.findOne({ id }).exec();
  }

  async update(
    id: number,
    data: Partial<CreateTabRequest>,
  ): Promise<ITab | null> {
    return Tab.findOneAndUpdate({ id }, data, {
      returnDocument: "after",
    }).exec();
  }

  async delete(id: number): Promise<void> {
    await Tab.findOneAndDelete({ id }).exec();
  }
}
