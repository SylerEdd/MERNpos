import { RoleRepository } from "../repositories/RoleRepository";
import { CreateRoleRequest } from "../dto/role/CreateRoleRequest";
import { RoleResponse } from "../dto/role/RoleResponse";
import { IRole } from "../entities/Role";

const repo = new RoleRepository();

// maps the interface role for response
function toResponse(entity: IRole): RoleResponse {
  return {
    id: entity.id,
    name: entity.name,
    createdAt: entity.createdAt!.toISOString(),
  };
}

export class RoleService {
  // returns all roles
  async getAll(): Promise<RoleResponse[]> {
    const roles = await repo.findAll();
    return roles.map(toResponse);
  }

  // returns role by id
  async getById(id: number): Promise<RoleResponse | null> {
    const role = await repo.findById(id);
    return role ? toResponse(role) : null;
  }

  // returns role by name
  async getByName(name: string): Promise<RoleResponse | null> {
    const role = await repo.findByName(name);
    return role ? toResponse(role) : null;
  }

  // creates a role
  async create(request: CreateRoleRequest): Promise<RoleResponse> {
    if (!request.name) {
      throw new Error("Role name is required");
    }
    const created = await repo.create(request);
    return toResponse(created);
  }

  // updates a role
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

  // deletes a role
  async delete(id: number): Promise<void> {
    await repo.delete(id);
  }
}
