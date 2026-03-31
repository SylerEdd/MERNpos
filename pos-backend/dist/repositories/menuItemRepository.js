"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemRepository = void 0;
const MenuItem_1 = require("../entities/MenuItem");
//create method will hash the password before saving to the database, we will use bcrypt for hashing
//findByUsername and findByEmail are used for authentication and validation purposes
class MenuItemRepository {
    async findAll() {
        return MenuItem_1.MenuItem.find().exec();
    }
    async findById(id) {
        return MenuItem_1.MenuItem.findById(id).exec();
    }
    async findByNumericId(id) {
        return MenuItem_1.MenuItem.findOne({ id }).exec();
    }
    async create(data) {
        const item = new MenuItem_1.MenuItem(data);
        return item.save();
    }
    async update(id, data) {
        return MenuItem_1.MenuItem.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        await MenuItem_1.MenuItem.findByIdAndDelete(id).exec();
    }
}
exports.MenuItemRepository = MenuItemRepository;
