import { RoleRepository } from "../repositories/RoleRepository";
import { CreateRoleRequest } from "../dto/role/CreateRoleRequest";
import { RoleResponse } from "../dto/role/RoleResponse";
import { IRole } from "../entities/Role";

const repo = new RoleRepository();

function toResponse(entity: IRole): RoleResponse {
  return {
    id: entity.id,
    name: entity.name,
    createdAt: entity.createdAt!.toISOString(),
  };
}

export class RoleService {
  async getAll(): Promise<RoleResponse[]> {
    const roles = await repo.findAll();
    return roles.map(toResponse);
  }

  async getById(id: number): Promise<RoleResponse | null> {
    const role = await repo.findById(id);
    return role ? toResponse(role) : null;
  }

  async create(request: CreateRoleRequest): Promise<RoleResponse> {
    if (!request.name) {
      throw new Error("Role name is required");
    }
    const created = await repo.create(request);
    return toResponse(created);
  }

  async update(id: number, request: CreateRoleRequest): Promise<RoleResponse> {
    if (!request.name) {
      throw new Error("Role name is required");
    }
    const updated = await repo.update(id, request);
    if (!updated) {
      throw new Error("Role not found");
    }
    return toResponse(updated);
  }

  async delete(id: number): Promise<void> {
    await repo.delete(id);
  }
}
