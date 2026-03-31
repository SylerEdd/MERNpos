"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const Role_1 = require("../entities/Role");
class RoleRepository {
    async findAll() {
        //sort by id in ascending order to maintain the order of roles as they were created
        return Role_1.Role.find().sort({ id: 1 }).exec();
    }
    async findById(id) {
        return Role_1.Role.findOne({ id }).exec();
    }
    async findByName(name) {
        return Role_1.Role.findOne({ name }).exec();
    }
    //changed create method to generate sequential id for roles, this will make it easier to manage and reference roles in the application logic, especially when assigning roles to users
    async create(data) {
        const lastRole = await Role_1.Role.findOne().sort({ id: -1 }).exec();
        const nextId = lastRole ? lastRole.id + 1 : 1;
        const role = new Role_1.Role({ ...data, id: nextId });
        return role.save();
    }
    async update(id, data) {
        return Role_1.Role.findOneAndUpdate({ id }, data, { new: true }).exec();
    }
    async delete(id) {
        await Role_1.Role.findOneAndDelete({ id }).exec();
    }
}
exports.RoleRepository = RoleRepository;
