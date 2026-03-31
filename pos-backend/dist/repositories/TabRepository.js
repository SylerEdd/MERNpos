"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabRepository = void 0;
const Tab_1 = require("../entities/Tab");
class TabRepository {
    async create(data) {
        const lastTab = await Tab_1.Tab.findOne().sort({ id: -1 }).exec();
        const nextId = lastTab ? lastTab.id + 1 : 1;
        const tab = new Tab_1.Tab({ ...data, id: nextId });
        return tab.save();
    }
    async findAll() {
        return Tab_1.Tab.find().exec();
    }
    async findById(id) {
        return Tab_1.Tab.findOne({ id }).exec();
    }
    async update(id, data) {
        return Tab_1.Tab.findOneAndUpdate({ id }, data, { new: true }).exec();
    }
    async delete(id) {
        await Tab_1.Tab.findOneAndDelete({ id }).exec();
    }
}
exports.TabRepository = TabRepository;
