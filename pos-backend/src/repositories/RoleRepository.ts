import { CreateRoleRequest } from "../dto/role/CreateRoleRequest";
import { Role, IRole } from "../entities/Role";

export class RoleRepository {
  async findAll(): Promise<IRole[]> {
    //sort by id in ascending order to maintain the order of roles as they were created
    return Role.find().sort({ id: 1 }).exec();
  }

  async findById(id: number): Promise<IRole | null> {
    return Role.findOne({ id }).exec();
  }

  async findByName(name: string): Promise<IRole | null> {
    return Role.findOne({ name }).exec();
  }

  //changed create method to generate sequential id for roles, this will make it easier to manage and reference roles in the application logic, especially when assigning roles to users
  async create(data: CreateRoleRequest): Promise<IRole> {
    const lastRole = await Role.findOne().sort({ id: -1 }).exec();
    const nextId = lastRole ? lastRole.id + 1 : 1;

    const role = new Role({ ...data, id: nextId });
    return role.save();
  }

  async update(
    id: number,
    data: Partial<CreateRoleRequest>,
  ): Promise<IRole | null> {
    return Role.findOneAndUpdate({ id }, data, {
      returnDocument: "after",
    }).exec();
  }

  async delete(id: number): Promise<void> {
    await Role.findOneAndDelete({ id }).exec();
  }
}
