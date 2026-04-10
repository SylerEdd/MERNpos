import { UserRepository } from "../repositories/UserRepository";
import { CreateUserRequest } from "../dto/user/CreateUserRequest";
import { UserResponse } from "../dto/user/UserResponse";
import { IUser } from "../entities/User";

const repo = new UserRepository();

// maps the user entity for response (doesnt include password to prevent leaking)
function toResponse(entity: IUser): UserResponse {
  const roles = Array.isArray(entity.roles) ? entity.roles : [];
  return {
    id: entity.id,
    fullName: entity.fullName,
    username: entity.username,
    email: entity.email,
    roles: roles.map((role: any) => {
      if (role && typeof role === "object") {
        return role.name || role.toString();
      }
      return String(role);
    }),
    createdAt: entity.createdAt
      ? entity.createdAt.toISOString()
      : new Date().toISOString(),
  };
}

export class UserService {
  // returns all users
  async getAll(): Promise<UserResponse[]> {
    const users = await repo.findAll();
    return users.map(toResponse);
  }

  //returns user by id
  async getById(id: number): Promise<UserResponse | null> {
    const user = await repo.findById(id);
    return user ? toResponse(user) : null;
  }

  // returns user by username
  async getByUsername(username: string): Promise<UserResponse | null> {
    const user = await repo.findByUsername(username);
    return user ? toResponse(user) : null;
  }

  //creates the user
  async create(request: CreateUserRequest): Promise<UserResponse> {
    if (
      !request.fullName ||
      !request.username ||
      !request.email ||
      !request.password ||
      !request.roles
    ) {
      throw new Error(
        "Full name, username, email, password and roles are required",
      );
    }
    const created = await repo.create(request);
    return toResponse(created);
  }

  // now we patch only some fields of the user, not all fields like in update method
  async patch(
    id: number,
    request: Partial<CreateUserRequest>,
  ): Promise<UserResponse> {
    const updated = await repo.patch(id, request);
    if (!updated) {
      throw new Error("User not found");
    }
    return toResponse(updated);
  }

  // deletes user
  async delete(id: number): Promise<void> {
    await repo.delete(id);
  }
}
