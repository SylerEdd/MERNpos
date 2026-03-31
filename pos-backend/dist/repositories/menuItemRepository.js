"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemRepository = void 0;
const MenuItem_1 = require("../entities/MenuItem");
//create method will hash the password before saving to the database, we will use bcrypt for hashing
//findByUsername and findByEmail are used for authentication and validation purposes
class MenuItemRepository {
    async findAll() {
        return MenuItem_1.MenuItem.find().sort({ id: 1 }).exec();
    }
    async findById(id) {
        return MenuItem_1.MenuItem.findOne({ id }).exec();
    }
    async create(data) {
        const lastItem = await MenuItem_1.MenuItem.findOne().sort({ id: -1 }).lean().exec();
        const nextId = lastItem && typeof lastItem.id === "number" ? lastItem.id + 1 : 1;
        const item = new MenuItem_1.MenuItem({ ...data, id: nextId });
        return item.save();
    }
    async update(id, data) {
        return MenuItem_1.MenuItem.findOneAndUpdate({ id }, data, { new: true }).exec();
    }
    async delete(id) {
        await MenuItem_1.MenuItem.findOneAndDelete({ id }).exec();
    }
}
exports.MenuItemRepository = MenuItemRepository;
