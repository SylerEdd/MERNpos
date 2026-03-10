import { CreateRoleRequest } from "../dto/role/CreateRoleRequest";
import { Role, IRole } from "../entities/Role";

export class RoleRepository {
  async findAll(): Promise<IRole[]> {
    return Role.find().exec();
  }

  async findById(id: string): Promise<IRole | null> {
    return Role.findById(id).exec();
  }

  async create(data: CreateRoleRequest): Promise<IRole> {
    const role = new Role(data);
    return role.save();
  }

  async update(
    id: string,
    data: Partial<CreateRoleRequest>,
  ): Promise<IRole | null> {
    return Role.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await Role.findByIdAndDelete(id).exec();
  }
}
