"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Role_1 = require("../entities/Role");
//UserRepository with methods: findAll, findById, findByUsername, findByEmail, create, update, delete
//findByUsername and findByEmail are used for authentication and validation purposes
//create method will hash the password before saving to the database, we will use bcrypt for hashing
class UserRepository {
    async toRoleObjectIds(roleIds) {
        if (!Array.isArray(roleIds)) {
            return [];
        }
        const normalizedIds = roleIds
            .map((r) => {
            if (typeof r === "number")
                return r;
            if (typeof r === "string" && r.trim().length > 0) {
                const asNumber = Number(r);
                return Number.isFinite(asNumber) ? asNumber : null;
            }
            return null;
        })
            .filter((v) => typeof v === "number");
        if (normalizedIds.length === 0) {
            return [];
        }
        const roles = await Role_1.Role.find({ id: { $in: normalizedIds } }).exec();
        if (roles.length !== normalizedIds.length) {
            throw new Error("One or more roles provided do not exist");
        }
        return roles.map((role) => role._id);
    }
    async findAll() {
        return User_1.User.find().populate("roles").exec();
    }
    async findById(id) {
        return User_1.User.findOne({ id }).populate("roles").exec();
    }
    async findByUsername(username) {
        return User_1.User.findOne({ username }).populate("roles").exec();
    }
    async findByEmail(email) {
        return User_1.User.findOne({ email }).exec();
    }
    async create(data) {
        const lastUser = await User_1.User.findOne().sort({ id: -1 }).exec();
        const nextId = lastUser ? lastUser.id + 1 : 1;
        const passwordHash = await bcrypt_1.default.hash(data.password, 10);
        const roleObjectIds = await this.toRoleObjectIds(data.roles || []);
        const user = new User_1.User({
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
    async patch(id, data) {
        const updateData = {};
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
            updateData.passwordHash = await bcrypt_1.default.hash(data.password, 10);
        }
        if (data.roles !== undefined) {
            updateData.roles = await this.toRoleObjectIds(data.roles);
        }
        return User_1.User.findOneAndUpdate({ id }, updateData, {
            new: true,
        })
            .populate("roles")
            .exec();
    }
    async delete(id) {
        await User_1.User.findOneAndDelete({ id }).exec();
    }
}
exports.UserRepository = UserRepository;
