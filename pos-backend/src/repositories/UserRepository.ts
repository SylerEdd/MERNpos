import { CreateUserRequest } from "../dto/user/CreateUserRequest";
import { User, IUser } from "../entities/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Role } from "../entities/Role";

//UserRepository with methods: findAll, findById, findByUsername, findByEmail, create, update, delete
//findByUsername and findByEmail are used for authentication and validation purposes
//create method will hash the password before saving to the database, we will use bcrypt for hashing

export class UserRepository {
  private async toRoleObjectIds(
    roleIds: Array<number | string>,
  ): Promise<any[]> {
    if (!Array.isArray(roleIds)) {
      return [];
    }
    const normalizedIds = roleIds
      .map((r) => {
        if (typeof r === "number") return r;
        if (typeof r === "string" && r.trim().length > 0) {
          const asNumber = Number(r);
          return Number.isFinite(asNumber) ? asNumber : null;
        }
        return null;
      })
      .filter((v): v is number => typeof v === "number");

    if (normalizedIds.length === 0) {
      return [];
    }

    const roles = await Role.find({ id: { $in: normalizedIds } }).exec();
    if (roles.length !== normalizedIds.length) {
      throw new Error("One or more roles provided do not exist");
    }
    return roles.map((role) => role._id);
  }

  async findAll(): Promise<IUser[]> {
    return User.find().populate("roles").exec();
  }

  async findById(id: number): Promise<IUser | null> {
    return User.findOne({ id }).populate("roles").exec();
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username }).populate("roles").exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec();
  }

  async create(data: CreateUserRequest): Promise<IUser> {
    const lastUser = await User.findOne().sort({ id: -1 }).exec();
    const nextId = lastUser ? lastUser.id + 1 : 1;

    const passwordHash = await bcrypt.hash(data.password, 10);

    const roleObjectIds = await this.toRoleObjectIds(data.roles || []);

    const user = new User({
      id: nextId,
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      passwordHash,
      roles: roleObjectIds,
    });

    return user.save();
  }

  // we need async patch now because we want to update only some fields of the user, not all fields like in update method
  async patch(
    id: number,
    data: Partial<CreateUserRequest>,
  ): Promise<IUser | null> {
    const updateData: any = {};
    if (data.fullName !== undefined) {
      updateData.fullName = data.fullName;
    }
    if (data.username !== undefined) {
      updateData.username = data.username;
    }
    if (data.email !== undefined) {
      updateData.email = data.email;
    }
    if (data.password !== undefined) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }
    if (data.roles !== undefined) {
      updateData.roles = await this.toRoleObjectIds(data.roles);
    }

    return User.findOneAndUpdate({ id }, updateData, {
      new: true,
    })
      .populate("roles")
      .exec();
  }

  async delete(id: number): Promise<void> {
    await User.findOneAndDelete({ id }).exec();
  }
}
